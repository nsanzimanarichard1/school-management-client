export const getDeviceId = (): string => {
  let deviceId = localStorage.getItem('adminDeviceId')
  
  if (!deviceId) {
    deviceId = `admin-${navigator.userAgent}-${screen.width}x${screen.height}-${navigator.language}-${Date.now()}`
    deviceId = btoa(deviceId).substring(0, 32)
    localStorage.setItem('adminDeviceId', deviceId)
  }
  
  return deviceId
}
