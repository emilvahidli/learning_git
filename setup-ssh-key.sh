#!/bin/bash
echo "🔑 SSH Key Setup for pgAdmin"
echo ""

# SSH key yoxlama
if [ ! -f ~/.ssh/id_rsa ]; then
    echo "📝 SSH key yoxdur. Yaratmaq istəyirsiniz? (y/n)"
    read -r response
    if [ "$response" = "y" ] || [ "$response" = "Y" ]; then
        ssh-keygen -t rsa -b 4096 -C "proep@example.com"
        echo "✅ SSH key yaradıldı: ~/.ssh/id_rsa"
    else
        echo "❌ SSH key yaradılmadı"
        exit 1
    fi
else
    echo "✅ SSH key mövcuddur: ~/.ssh/id_rsa"
fi

# SSH key serverə copy etmək
echo ""
echo "📤 SSH key serverə copy etmək istəyirsiniz? (y/n)"
read -r response
if [ "$response" = "y" ] || [ "$response" = "Y" ]; then
    ssh-copy-id pro@78.46.213.237
    echo "✅ SSH key serverə copy olundu"
else
    echo "⚠️  SSH key serverə copy olunmadı"
    echo "Manual olaraq işlədirsiniz:"
    echo "  cat ~/.ssh/id_rsa.pub | ssh pro@78.46.213.237 'mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys'"
fi

echo ""
echo "✅ Setup tamamlandı!"
echo "📋 pgAdmin-də SSH Key Path:"
echo "   /Users/emil.vahidli/.ssh/id_rsa"
