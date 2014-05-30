adapt-contrib-flipCard
======================

Flip Card Component/Plug-in developed by CrediPoint Solutions for Adapt Framework v1.0.0.

A basic flip card Component/Plug-in that generates cards with an image on the front face and text on the back face.

Installation
------------

First, be sure to install the [Adapt Command Line Interface](https://github.com/cajones/adapt-cli), then from the command line run:

		adapt install adapt-contrib-flipCard

Usage
------

For example JSON format, see [example.json](https://github.com/CrediPointSolutions/adapt-contrib-flipCard/blob/master/example.json).

Two variations are in-built in this template. Individual flip and single flip. I have provided examples for both below.

Individual Flip Example: All flip cards can flip at any given point of time and all will remain open.

	{
		"_id":"c-10",
		"_parentId":"b-10",
		"_type":"component",
		"_component":"flipCard",
		"_classes":"",
		"_layout":"full",
		"title": "Flip Card",
		"body": "This is optional body text. Click the image below to reveal the text.",
		"items": [
			{
				"frontImageSrc":"assets/flip_1.png",
				"backHeading":"To overcome Global Climate Change challenges, it is essential to:",
				"backListOfOptions": [
					"Avail technology no matter how expensive it be, to reduce greenhouse releases.",
					"Persuade the citizens of a nation to get together and work towards a development program.",
					"Follow rules and regulations set by the government to avoid excessive greenhouse emissions."
				]
			},
			{
				"frontImageSrc":"assets/flip_2.png",
				"backHeading":"To overcome Global Climate Change challenges, it is essential to:",
				"backListOfOptions": [
					"Avail technology no matter how expensive it be, to reduce greenhouse releases.",
					"Persuade the citizens of a nation to get together and work towards a development program.",
					"Follow rules and regulations set by the government to avoid excessive greenhouse emissions."
				]
			}
		],
		"_flipType": "individualFlip",
		"_flipTime":400
	}

Single Flip Example: Only one flip card can flip at any given point of time and only one will remain open. If you click/tap on other flipCard the other open flip card will automatically close. 

	{
	 	"_id":"c-20",
	 	"_parentId":"b-20",
	 	"_type":"component",
	 	"_component":"flipCard",
	 	"_classes":"",
	 	"_layout":"full",
	 	"title": "Flip Card",
	 	"body": "This is optional body text. Click the image below to reveal the text.",
	 	"items": [
	 		{
	 			"frontImageSrc":"assets/flip_1.png",
	 			"backHeading":"To overcome Global Climate Change challenges, it is essential to:",
	 			"backListOfOptions": [
	 				"Avail technology no matter how expensive it be, to reduce greenhouse releases.",
	 				"Persuade the citizens of a nation to get together and work towards a development program.",
	 				"Follow rules and regulations set by the government to avoid excessive greenhouse emissions."
	 			]
	 		},
	 		{
	 			"frontImageSrc":"assets/flip_2.png",
	 			"backHeading":"To overcome Global Climate Change challenges, it is essential to:",
	 			"backListOfOptions": [
	 				"Avail technology no matter how expensive it be, to reduce greenhouse releases.",
	 				"Persuade the citizens of a nation to get together and work towards a development program.",
	 				"Follow rules and regulations set by the government to avoid excessive greenhouse emissions."
	 			]
	 		}
	 	],
	 	"_flipType": "singleFlip",
	 	"_flipTime":400
	}

Important
---------

This component works in IE9- but has slight change in behaviour, instead of flip effect it gets a fade-in/out effect.

Please feel free to add issues and updates needed in the component.
