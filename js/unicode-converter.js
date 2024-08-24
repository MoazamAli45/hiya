//enforce unicode strikethrough on pricing for select options
let unicodeChar = ['0̶','1̶','2̶','3̶','4̶','5̶','6̶','7̶','8̶','9̶','$̶'];
const doUniCodeUpdate = function(list){
  for(let lo=0;list[lo];lo++){
    let optionText = list[lo].innerText.split('Reg: $');
    let newOP = optionText[1].replace(')','').split('');
    for(let i=0;newOP[i];i++) newOP[i]=unicodeChar[parseInt(newOP[i])];
    newOP = unicodeChar[10]+newOP.join('');
    optionText = optionText[0] + 'Reg: ' + newOP + ')';
    list[lo].innerHTML = optionText;
  }
};
if(document.querySelectorAll('.optionList > select > option').length>0) doUniCodeUpdate(document.querySelectorAll('.optionList > select > option'));
if(document.querySelectorAll('select#select-variant > option').length>0) doUniCodeUpdate(document.querySelectorAll('select#select-variant > option'));