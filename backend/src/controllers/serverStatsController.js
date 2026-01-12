import si from 'systeminformation';
import { requireAuth } from '../middleware/auth.js';

/**
 * Server statistikalarını əldə et
 */
export async function getServerStats(req, res) {
  try {
    // CPU məlumatları
    const cpu = await si.cpu();
    const currentLoad = await si.currentLoad();
    
    // RAM məlumatları
    const mem = await si.mem();
    const memUsed = mem.used;
    const memTotal = mem.total;
    const memFree = mem.free;
    const memUsedPercent = ((memUsed / memTotal) * 100).toFixed(2);
    
    // Disk məlumatları
    const fsSize = await si.fsSize();
    const diskTotal = fsSize.reduce((sum, disk) => sum + disk.size, 0);
    const diskUsed = fsSize.reduce((sum, disk) => sum + disk.used, 0);
    const diskFree = fsSize.reduce((sum, disk) => sum + disk.available, 0);
    const diskUsedPercent = ((diskUsed / diskTotal) * 100).toFixed(2);
    
    // Network məlumatları
    const networkStats = await si.networkStats();
    
    // Uptime
    const uptime = await si.time();
    
    // System info
    const system = await si.system();
    const osInfo = await si.osInfo();
    
    return res.status(200).json({
      success: true,
      data: {
        cpu: {
          manufacturer: cpu.manufacturer,
          brand: cpu.brand,
          cores: cpu.cores,
          physicalCores: cpu.physicalCores,
          usage: parseFloat(currentLoad.currentLoad.toFixed(2)),
          coresUsage: currentLoad.cpus.map(cpu => ({
            load: parseFloat(cpu.load.toFixed(2))
          }))
        },
        memory: {
          total: memTotal,
          used: memUsed,
          free: memFree,
          usedPercent: parseFloat(memUsedPercent),
          totalGB: (memTotal / (1024 * 1024 * 1024)).toFixed(2),
          usedGB: (memUsed / (1024 * 1024 * 1024)).toFixed(2),
          freeGB: (memFree / (1024 * 1024 * 1024)).toFixed(2)
        },
        disk: {
          total: diskTotal,
          used: diskUsed,
          free: diskFree,
          usedPercent: parseFloat(diskUsedPercent),
          totalGB: (diskTotal / (1024 * 1024 * 1024)).toFixed(2),
          usedGB: (diskUsed / (1024 * 1024 * 1024)).toFixed(2),
          freeGB: (diskFree / (1024 * 1024 * 1024)).toFixed(2),
          disks: fsSize.map(disk => ({
            fs: disk.fs,
            type: disk.type,
            size: disk.size,
            used: disk.used,
            available: disk.available,
            use: parseFloat(disk.use.toFixed(2)),
            mount: disk.mount
          }))
        },
        network: {
          interfaces: networkStats.map(iface => ({
            iface: iface.iface,
            rx_bytes: iface.rx_bytes,
            tx_bytes: iface.tx_bytes,
            rx_bytes_mb: (iface.rx_bytes / (1024 * 1024)).toFixed(2),
            tx_bytes_mb: (iface.tx_bytes / (1024 * 1024)).toFixed(2)
          }))
        },
        system: {
          manufacturer: system.manufacturer,
          model: system.model,
          platform: osInfo.platform,
          distro: osInfo.distro,
          release: osInfo.release,
          arch: osInfo.arch,
          hostname: osInfo.hostname,
          uptime: uptime.uptime,
          uptimeFormatted: formatUptime(uptime.uptime)
        },
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Get server stats error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server statistikaları əldə edilə bilmədi',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

/**
 * Uptime-u formatla
 */
function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (days > 0) {
    return `${days} gün, ${hours} saat, ${minutes} dəqiqə`;
  } else if (hours > 0) {
    return `${hours} saat, ${minutes} dəqiqə`;
  } else {
    return `${minutes} dəqiqə`;
  }
}
