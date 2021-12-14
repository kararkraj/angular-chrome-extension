chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color: '#3aa757' });
    chrome.webNavigation.onCompleted.addListener(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, async ([{ id }]) => {
            if (id) {
                chrome.pageAction.show(id);
                // getCPUAndMemoryDetails();
                // setInterval(() => {
                //     getCPUAndMemoryDetails();
                // }, 5000);
            }
        });
    });
});

let preCpuInfo: chrome.system.cpu.CpuInfo;
function getCPUAndMemoryDetails() {
    chrome.system.cpu.getInfo((cpuInfo: chrome.system.cpu.CpuInfo) => {
        chrome.system.memory.getInfo((memoryInfo: chrome.system.memory.MemoryInfo) => {
            let usage: {
                cpu: number;
                ram: number;
            } = {
                cpu: 0,
                ram: 0
            };
            let cpuUsagePercent: number = 0;
            for (let i = 0; i < cpuInfo.numOfProcessors; i++) {
                let usage = cpuInfo.processors[i].usage;
                if (preCpuInfo) {
                    let oldUsage = preCpuInfo.processors[i].usage;
                    cpuUsagePercent += Math.floor((usage.kernel + usage.user - oldUsage.kernel - oldUsage.user) / (usage.total - oldUsage.total) * 100);
                } else {
                    cpuUsagePercent += Math.floor((usage.kernel + usage.user) / usage.total * 100);
                }
            }
            preCpuInfo = cpuInfo;
            let percentRAMUsage = Math.round(100 * (memoryInfo.capacity - memoryInfo.availableCapacity) / memoryInfo.capacity);
        });
    });
}