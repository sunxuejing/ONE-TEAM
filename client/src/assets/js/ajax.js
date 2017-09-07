const _ajax = (obj) => {
  obj = obj || {}
  obj.type = (obj.type || 'GET').toUpperCase()
  obj.dataType = obj.dataType || 'json'

  var params = _formatParams(obj.data)
  var xhr

  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest()
  } else {
    // xhr = new AxtiveXObject('Microsoft.XMLHTTP')
  }
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        obj.success && obj.success(xhr.responseText, xhr.responseXML)
      } else {
        obj.error && obj.error(xhr.status)
      }
    }
  }

  if (obj.type === 'GET') {
    xhr.open('GET', obj.url + '?' + params, true)
    xhr.send(null)
  } else if (obj.type === 'POST') {
    xhr.open('POST', obj.url, true)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(params)
  }
}

// 格式化参数
const _formatParams = (data) => {
  var arr = []
  for (var name in data) {
    arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]))
  }
  // 清除缓存
  arr.push('t=' + Math.random())
  return arr.join('&')
}

export const _post = (url, data, callback, catchCallback) => {
  _ajax({
    url: url,
    type: 'POST',
    data: data,
    success: callback
  })
}
