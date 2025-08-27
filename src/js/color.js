let root = document.querySelector(':root');
let comp = root.computedStyleMap(); 

for(let i = 1; i < 101; i++){
	root.style.setProperty(`--surface-${i}`,`rgb(from var(--surface) r g b / ${i}%)`)
	root.style.setProperty(`--background-${i}`,`rgb(from var(--background) r g b / ${i}%)`)
}
