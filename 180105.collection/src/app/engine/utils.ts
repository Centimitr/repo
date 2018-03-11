class LocalizableText {
  values = new Map<string, string>()

  constructor(value: string,
              lang: string = 'en_US') {
    this.values.set(lang, value)
  }
}

class StorageUsage {
  print() {
    navigator['webkitTemporaryStorage']['queryUsageAndQuota'](
      function (usedBytes, grantedBytes) {
        const percentage = Math.round(usedBytes / grantedBytes * 100 * 100) / 100
        const toMB = bytes => Math.round(bytes / 1024 / 1024 * 100) / 100
        const toGB = bytes => Math.round(grantedBytes / 1024 / 1024 / 1024 * 100) / 100
        console.log(`Usage: ${toMB(usedBytes)} MB / ${toGB(grantedBytes)} GB (${percentage}%)`);
      },
      function (e) {
        console.log('Error', e);
      }
    );
  }
}

export {
  LocalizableText,
  StorageUsage
}
