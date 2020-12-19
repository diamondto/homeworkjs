function code2utf8(unicode) {
  let unicodeBin = unicode.toString(2);
  if (unicode < 128) {
    return unicode.toString(16);
  } else if (unicode < 2048) {
    unicodeBin = ('00000000000000000' + unicodeBin).slice(-11);
    const s1 =  parseInt("110" + unicodeBin.substring(0, 5), 2);
    const s2 =  parseInt("10" + unicodeBin.substring(5), 2);
    return s1.toString(16) + ',' + s2.toString(16)
  } else {
    unicodeBin = ('00000000000000000' + unicodeBin).slice(-16);
    const s1 = parseInt('1110' + unicodeBin.substring(0, 4),2 );
    const s2 = parseInt('10' + unicodeBin.substring(4, 10), 2 );
    const s3 = parseInt('10' + unicodeBin.substring(10), 2);
    return s1.toString(16) + ',' + s2.toString(16) + ',' + s3.toString(16)
  }
}

function string2UTF8buffer(str) {
  let val = '';
  for (let i = 0; i < str.length; i++) {
    val += ',' + code2utf8(str.charCodeAt(i))
  }
  val += ',00';
  return new Uint8Array(val.match(/[\da-f]{2}/gi).map(function (h) {
    return parseInt(h, 16)
  })).buffer
}


console.log(string2UTF8buffer('一'));
console.log(string2UTF8buffer('hello'));
