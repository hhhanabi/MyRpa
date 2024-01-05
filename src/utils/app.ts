const fs = require('fs')

export default function hello(){
  fs.writeFileSync('d://test//c.txt','aaa')
  console.log('hrllo');
  
}