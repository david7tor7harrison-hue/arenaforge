const splashMessages = [
	
	"India's Competitive Gaming Platform",
	
	"No Deposits. No Wallet Hassle.",
	
	"Pay Match Entry Fee Directly",
	
	"Win Today. Get Paid On UPI.",
	
	"Custom Tournament Settings Available",
	
	"Build Your Gaming Career With ArenaForge",
	
	"Loading Competitive Experience..."
	
];

const splash =
	document.getElementById(
		"splashScreen"
	);

const params =
	new URLSearchParams(
		window.location.search
	);

const fromInternal =
	params.get("from") ===
	"internal";

if (fromInternal) {
	
	splash.style.display =
		"none";
	
}

else {
	
	startIntro();
	
}

function startIntro() {
	
	const text =
		document.getElementById(
			"splashText"
		);
	
	const bar =
		document.getElementById(
			"introBar"
		);
	
	let index = 0;
	
	const totalDuration =
		splashMessages.length *
		2450;
	
	setTimeout(() => {
		
		bar.style.transition =
			`width ${totalDuration}ms linear`;
		
		bar.style.width =
			"100%";
		
	}, 100);
	
	function nextMessage() {
		
		if (
			index >=
			splashMessages.length
		) {
			
			closeSplash();
			
			return;
			
		}
		
		text.style.opacity =
			"0";
		
		setTimeout(() => {
			
			text.innerText =
				splashMessages[index];
			
			text.style.opacity =
				"1";
			
			index++;
			
			setTimeout(
				nextMessage,
				2200
			);
			
		}, 250);
		
	}
	
	nextMessage();
	
}

function closeSplash() {
	
	splash.style.opacity =
		"0";
	
	splash.style.transform =
		"scale(1.05)";
	
	setTimeout(() => {
		
		splash.style.display =
			"none";
		
	}, 800);
	
}


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
