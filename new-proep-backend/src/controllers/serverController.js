
export const getServerStats = async (req, res) => {
    try {
        // Mock data for reliable demo visualization

        // Randomize slightly to show movement in charts
        const cpu = Math.floor(Math.random() * (60 - 30 + 1) + 30); // 30-60%
        const memory = Math.floor(Math.random() * (70 - 40 + 1) + 40); // 40-70%
        const disk = 45; // Static-ish
        const network = Math.floor(Math.random() * (120 - 20 + 1) + 20); // 20-120 ms latency
        const gpu = Math.floor(Math.random() * (90 - 10 + 1) + 10); // 10-90% utilization

        // Mock Service Data
        const postgres = {
            status: 'healthy',
            activeQueries: Math.floor(Math.random() * 20) + 5,
            uptime: '14d 2h'
        };

        const nginx = {
            status: Math.random() > 0.9 ? 'warning' : 'healthy', // Occasional warning
            requestsPerSec: Math.floor(Math.random() * 1000) + 200,
            errorRate: (Math.random() * 0.5).toFixed(2),
            uptime: '45d 10h'
        };

        res.status(200).json({
            success: true,
            data: {
                cpu,
                memory,
                disk,
                network,
                gpu,
                services: {
                    postgres,
                    nginx
                },
                timestamp: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Server stats error:', error);
        res.status(500).json({ success: false, message: 'Error fetching server stats' });
    }
};
