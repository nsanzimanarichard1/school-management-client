export const getDeviceId = (): string => {
  let deviceId = localStorage.getItem('deviceId')
  
  if (!deviceId) {
    deviceId = `${navigator.userAgent}-${screen.width}x${screen.height}-${navigator.language}-${Date.now()}`
    deviceId = btoa(deviceId).substring(0, 32)
    localStorage.setItem('deviceId', deviceId)
  }
  
  return deviceId
}
