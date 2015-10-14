#adapt-contrib-flipcard

Flip Card Component/Plug-in developed by Exult Corporation for Adapt Framework v2.0.x.

A basic flip card Component/Plug-in that generates cards with an image on the front face and text on the back face.

##Installation

First, be sure to install the [Adapt Command Line Interface](https://github.com/adaptlearning/adapt-cli), then from the command line run:

		adapt install adapt-contrib-flipcard

##Usage

For example JSON format, see [example.json](https://github.com/ExultCorp/adapt-contrib-flipcard/blob/master/example.json).

Two variations are in-built in this template. All flip and single flip. I have provided examples for both below.

All Flip Example: All flip cards can flip at any given point of time and all will remain open.

	{
		"_id":"c-135",
		"_parentId":"b-70",
		"_type":"component",
		"_component":"flipcard",
		"_classes":"",
		"_layout":"full",
		"title": "Flip Card",
		"displayTitle": "Flip Card",
		"body": "This is optional body text. Click the image below to reveal the text.",
		"instruction": "",
		"_flipType": "allFlip",
		"_flipTime": 400,
		"_items": [
			{
				"frontImage": {
					"src": "course/en/images/flip_1.png",
					"alt": "flipcard item 1 graphic alt text here."
				},
				"backTitle": "Heading 1",
				"backBody": "This is display text 1."
			},
			{
				"frontImage": {
					"src": "course/en/images/flip_2.png",
					"alt": "flipcard item 1 graphic alt text here."
				},
				"backTitle": "Heading 2",
				"backBody": "<ul><li>This is list item 1.</li><li>This is list item 2.</li></ul>"
			}
		]
	}

Single Flip Example: Only one flip card can flip at any given point of time and only one will remain open. If you click/tap on other flipcard the other open flip card will automatically close.

	{
	 	"_id":"c-135",
	 	"_parentId":"b-70",
	 	"_type":"component",
	 	"_component":"flipcard",
	 	"_classes":"",
	 	"_layout":"full",
	 	"title": "Flip Card",
	 	"displayTitle": "Flip Card",
	 	"body": "This is optional body text. Click the image below to reveal the text.",
	 	"instruction": "",
	 	"_flipType": "singleFlip",
	 	"_flipTime": 400,
	 	"_items": [
			{
				"frontImage": {
					"src": "course/en/images/flip_1.png",
					"alt": "flipcard item 1 graphic alt text here."
				},
				"backTitle": "Heading 1",
				"backBody": "This is display text 1."
			},
			{
				"frontImage": {
					"src": "course/en/images/flip_2.png",
					"alt": "flipcard item 1 graphic alt text here."
				},
				"backTitle": "Heading 2",
				"backBody": "<ul><li>This is list item 1.</li><li>This is list item 2.</li></ul>"
			}
		]
	}

##Settings overview

For example JSON format, see [example.json](https://github.com/ExultCorp/adapt-contrib-flipcard/blob/master/example.json)

The following explains further settings for the flipcard component:

####_component

This value must be: `flipcard`

####_classes

You can use this setting to add custom classes to your template and LESS file.

####_layout

This defines the position of the component in the block. Values can be `full`, `left` or `right`.

####_flipType

This value must be: `string` and would only accepts one of 'singleFlip' and 'allFlip' value.

####_flipTime

This value must be: `numeric` and should be use to sepecify time to flip.

####_items

Each item represents one element of the flipcard. Text values can be entered for `frontImage`, and `backTitle` for each element.

####frontImage

Enter a path to the image for front side of flipcard.

####backTitle

Enter a title text for back side of flipcard element. This text is optional.

####backBody

The text entered for the body will be shown when the back side of flipcard appears. This text is optional.

##Limitations

This component works in IE9- but has slight change in behaviour, instead of flip effect it gets a fade-in/out effect.

##Browser spec

This component has been tested to the standard Adapt browser specification.

##Important

Please feel free to add issues and updates needed in the component.
