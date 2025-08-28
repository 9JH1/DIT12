document.querySelectorAll("a").forEach((element)=>{
	element.title = element.href;
	let text = element.innerText;
	element.addEventListener("mouseenter",()=>text_animate(element,text));
})

function text_animate(element,text) {
  let virtual_origin = String(text);
  let render_list = [];
  let changes = 3;
	let timeout = 30;
	charSet = "1234567890#@$&%";
  
	for (let letter = 0; letter < virtual_origin.length; letter++) {
    let virtual_string_letter = virtual_origin.slice(0, letter);
    for (let randomLetter = 0; randomLetter < changes; randomLetter++) {
      let vslt = virtual_string_letter;
      vslt += charSet.charAt(Math.floor(Math.random() * charSet.length));
      render_list.push(vslt);
    }
   
		render_list.push(virtual_origin.slice(0, letter + 1));
  }

  for (let render = 0; render < render_list.length; render++)
    setTimeout(() => element.innerHTML = `${render_list[render]}${' '.repeat(text.length - render_list[render].length)}`, timeout * render);
}
