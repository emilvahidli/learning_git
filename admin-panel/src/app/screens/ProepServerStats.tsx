import { useEffect, useState } from 'react';
import { api, apiRequest } from '../../config/api';
import { Cpu, HardDrive, MemoryStick, Network, RefreshCw, Server as ServerIcon } from 'lucide-react';

interface ServerStats {
  cpu: {
    manufacturer: string;
    brand: string;
    cores: number;
    physicalCores: number;
    usage: number;
    coresUsage: Array<{ load: number }>;
  };
  memory: {
    total: number;
    used: number;
    free: number;
    usedPercent: number;
    totalGB: string;
    usedGB: string;
    freeGB: string;
  };
  disk: {
    total: number;
    used: number;
    free: number;
    usedPercent: number;
    totalGB: string;
    usedGB: string;
    freeGB: string;
    disks: Array<{
      fs: string;
      type: string;
      size: number;
      used: number;
      available: number;
      use: number;
      mount: string;
    }>;
  };
  network: {
    interfaces: Array<{
      iface: string;
      rx_bytes: number;
      tx_bytes: number;
      rx_bytes_mb: string;
      tx_bytes_mb: string;
    }>;
  };
  system: {
    manufacturer: string;
    model: string;
    platform: string;
    distro: string;
    release: string;
    arch: string;
    hostname: string;
    uptime: number;
    uptimeFormatted: string;
  };
  timestamp: string;
}

export function ProepServerStats() {
  const [stats, setStats] = useState<ServerStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiRequest(api.admin.serverStats, {
        method: 'GET',
      });
      if (response.success) {
        setStats(response.data);
      }
    } catch (err: any) {
      console.error('Load stats error:', err);
      setError(err.message || 'Statistikalar yüklənə bilmədi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
    
    if (autoRefresh) {
      const interval = setInterval(loadStats, 5000); // 5 saniyədə bir yenilə
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const getUsageColor = (percent: number) => {
    if (percent < 50) return 'from-green-500 to-emerald-500';
    if (percent < 75) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-rose-500';
  };

  const getUsageBgColor = (percent: number) => {
    if (percent < 50) return 'bg-green-500/20';
    if (percent < 75) return 'bg-yellow-500/20';
    return 'bg-red-500/20';
  };

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-400" />
          <p className="text-gray-400">Statistikalar yüklənir...</p>
        </div>
      </div>
    );
  }

  if (error && !stats) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={loadStats}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Yenidən yoxla
          </button>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Server Statistikaları</h1>
          <p className="text-gray-400">Real-time server məlumatları</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span>Avtomatik yenilənmə (5s)</span>
          </label>
          <button
            onClick={loadStats}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Yenilə
          </button>
        </div>
      </div>

      {/* System Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <ServerIcon className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-gray-400">Hostname</span>
          </div>
          <p className="text-white font-medium">{stats.system.hostname}</p>
        </div>
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <ServerIcon className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-gray-400">Platform</span>
          </div>
          <p className="text-white font-medium">{stats.system.distro} {stats.system.release}</p>
        </div>
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <ServerIcon className="w-5 h-5 text-green-400" />
            <span className="text-sm text-gray-400">Architecture</span>
          </div>
          <p className="text-white font-medium">{stats.system.arch}</p>
        </div>
        <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <ServerIcon className="w-5 h-5 text-cyan-400" />
            <span className="text-sm text-gray-400">Uptime</span>
          </div>
          <p className="text-white font-medium">{stats.system.uptimeFormatted}</p>
        </div>
      </div>

      {/* CPU */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Cpu className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-bold text-white">CPU</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">{stats.cpu.brand}</span>
              <span className="text-white font-bold">{stats.cpu.usage}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${getUsageColor(stats.cpu.usage)} transition-all duration-300`}
                style={{ width: `${stats.cpu.usage}%` }}
              />
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {stats.cpu.physicalCores} fiziki core, {stats.cpu.cores} virtual core
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400 mb-2">Core Usage</div>
            <div className="grid grid-cols-4 gap-2">
              {stats.cpu.coresUsage.slice(0, 8).map((core, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-xs text-gray-500 mb-1">Core {idx + 1}</div>
                  <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${getUsageColor(core.load)}`}
                      style={{ width: `${core.load}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{core.load.toFixed(1)}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Memory */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <MemoryStick className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-bold text-white">RAM</h2>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400">
            {stats.memory.usedGB} GB / {stats.memory.totalGB} GB istifadə olunub
          </span>
          <span className="text-white font-bold">{stats.memory.usedPercent}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${getUsageColor(stats.memory.usedPercent)} transition-all duration-300`}
            style={{ width: `${stats.memory.usedPercent}%` }}
          />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Total:</span>
            <span className="text-white ml-2">{stats.memory.totalGB} GB</span>
          </div>
          <div>
            <span className="text-gray-500">Used:</span>
            <span className="text-red-400 ml-2">{stats.memory.usedGB} GB</span>
          </div>
          <div>
            <span className="text-gray-500">Free:</span>
            <span className="text-green-400 ml-2">{stats.memory.freeGB} GB</span>
          </div>
        </div>
      </div>

      {/* Disk */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <HardDrive className="w-6 h-6 text-green-400" />
          <h2 className="text-xl font-bold text-white">Disk</h2>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">Ümumi</span>
              <span className="text-white font-bold">{stats.disk.usedPercent}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${getUsageColor(stats.disk.usedPercent)} transition-all duration-300`}
                style={{ width: `${stats.disk.usedPercent}%` }}
              />
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {stats.disk.usedGB} GB / {stats.disk.totalGB} GB istifadə olunub
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {stats.disk.disks.map((disk, idx) => (
              <div key={idx} className="bg-black/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{disk.mount}</span>
                  <span className="text-gray-400 text-sm">{disk.use}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden mb-2">
                  <div
                    className={`h-full bg-gradient-to-r ${getUsageColor(disk.use)}`}
                    style={{ width: `${disk.use}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500">
                  {disk.fs} ({disk.type}) - {(disk.used / (1024 * 1024 * 1024)).toFixed(2)} GB / {(disk.size / (1024 * 1024 * 1024)).toFixed(2)} GB
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Network */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <Network className="w-6 h-6 text-cyan-400" />
          <h2 className="text-xl font-bold text-white">Network</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.network.interfaces.map((iface, idx) => (
            <div key={idx} className="bg-black/50 rounded-lg p-4">
              <div className="text-white font-medium mb-3">{iface.iface}</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Received:</span>
                  <span className="text-green-400">{iface.rx_bytes_mb} MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Transmitted:</span>
                  <span className="text-blue-400">{iface.tx_bytes_mb} MB</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Last Update */}
      <div className="text-center text-sm text-gray-500">
        Son yenilənmə: {new Date(stats.timestamp).toLocaleString('az-AZ')}
      </div>
    </div>
  );
}
