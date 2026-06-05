const container =
	document.getElementById(
		"announcementContainer"
	);

if (
	container &&
	typeof announcements !==
	"undefined"
) {
	
	announcements.forEach(
		item => {
			
			container.innerHTML += `

<div
class="announcement-card
${item.type}"
>

${item.message}

</div>

`;
			
		});
	
}