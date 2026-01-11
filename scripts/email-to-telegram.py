#!/usr/bin/env python3
"""
Email to Telegram Script
Gələn email-ləri Telegram qrupuna göndərir
"""

import os
import email
import requests
import json
from pathlib import Path
from datetime import datetime

# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "8486628690:AAErAISU1RrNSOnA5V6gWV7K1VxM3QOQx8I")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "-5072517302")
TELEGRAM_API_URL = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"

# Maildir path
MAILDIR = Path.home() / "Maildir" / "new"
PROCESSED_DIR = Path.home() / "Maildir" / "cur"
LOG_FILE = Path.home() / "scripts" / "email-to-telegram.log"

def log_message(message):
    """Log message to file"""
    with open(LOG_FILE, 'a') as f:
        f.write(f"[{datetime.now()}] {message}\n")

def escape_markdown(text):
    """Escape Markdown special characters"""
    if not text:
        return ""
    special_chars = ['_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!']
    for char in special_chars:
        text = text.replace(char, f'\\{char}')
    return text

def send_telegram_message(message):
    """Send message to Telegram"""
    try:
        payload = {
            "chat_id": TELEGRAM_CHAT_ID,
            "text": message,
            "parse_mode": "Markdown"
        }
        response = requests.post(TELEGRAM_API_URL, json=payload, timeout=10)
        result = response.json()
        return result
    except Exception as e:
        log_message(f"Error sending Telegram message: {e}")
        return {"ok": False, "error": str(e)}

def process_email(email_path):
    """Process a single email file"""
    try:
        with open(email_path, 'rb') as f:
            msg = email.message_from_bytes(f.read())
        
        # Extract email fields
        from_addr = msg.get('From', 'Unknown')
        subject = msg.get('Subject', 'No Subject')
        date = msg.get('Date', 'Unknown')
        to_addr = msg.get('To', 'Unknown')
        
        # Get email body
        body = ""
        if msg.is_multipart():
            for part in msg.walk():
                content_type = part.get_content_type()
                if content_type == "text/plain":
                    try:
                        body = part.get_payload(decode=True).decode('utf-8', errors='ignore')
                        break
                    except:
                        pass
        else:
            try:
                body = msg.get_payload(decode=True).decode('utf-8', errors='ignore')
            except:
                body = str(msg.get_payload())
        
        # Clean body (remove excessive whitespace)
        body = ' '.join(body.split())
        
        # Limit body length
        if len(body) > 1000:
            body = body[:1000] + "..."
        
        # Format message
        message = f"""📧 *Yeni Email*

📮 *Göndərən:* {escape_markdown(from_addr)}
📬 *Alıcı:* {escape_markdown(to_addr)}
📋 *Mövzu:* {escape_markdown(subject)}
📅 *Tarix:* {escape_markdown(date)}

💬 *Mesaj:*
{escape_markdown(body)}"""
        
        # Send to Telegram
        result = send_telegram_message(message)
        
        if result.get('ok'):
            # Move to processed
            processed_path = PROCESSED_DIR / email_path.name
            email_path.rename(processed_path)
            log_message(f"✅ Processed: {email_path.name}")
            return True
        else:
            log_message(f"❌ Error sending to Telegram: {result}")
            return False
            
    except Exception as e:
        log_message(f"❌ Error processing {email_path}: {e}")
        return False

def main():
    """Main function"""
    # Create directories if they don't exist
    MAILDIR.mkdir(parents=True, exist_ok=True)
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    
    # Process all new emails
    email_count = 0
    for email_file in MAILDIR.glob('*'):
        if email_file.is_file():
            if process_email(email_file):
                email_count += 1
    
    if email_count > 0:
        log_message(f"📧 Processed {email_count} email(s)")

if __name__ == "__main__":
    main()
