import React, { useState } from 'react';
import SunEditor from 'suneditor-react';

const PlainEditor = (props) => {

    // HTML DATA INSIDE TEXT EDITOR
    const [value, setValue] = props.data;

    // TEXT EDITOR DEFAULT FONTS
    const defaultFonts = [
        "Arial",
        "Comic Sans MS",
        "Courier New",
        "Impact",
        "Georgia",
        "Tahoma",
        "Trebuchet MS",
        "Verdana"
    ];

    // TEXT EDITOR FONT OPTIONS
    const sortedFontOptions = [
        "Logical",
        "Salesforce Sans",
        "Garamond",
        "Sans-Serif",
        "Serif",
        "Times New Roman",
        "Helvetica",
        ...defaultFonts
    ].sort();

    // TEXT EDITOR OPTIONS
    const options = {
        buttonList: [
            ["undo", "redo"],
            ["font", "fontSize"],
            ['paragraphStyle', 'blockquote'],
            [
                "bold",
                "underline",
                "italic",
                "strike",
                "subscript",
                "superscript"
            ],
            ["fontColor", "hiliteColor"],
            ["align", "list", "lineHeight"],
            ["outdent", "indent"],

            ["table", "horizontalRule", "link", "image", "video"],
            // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
            // ['imageGallery'], // You must add the "imageGalleryUrl".
            ["fullScreen", "showBlocks", "codeView"],
            ["preview", "print"],
            ["removeFormat"]

            // ['save', 'template'],
            // '/', Line break
        ], // Or Array of button list, eg. [['font', 'align'], ['image']]
        defaultTag: "div",
        minHeight: "300px",
        showPathLabel: false,
        font: sortedFontOptions
    };

    return (
        <React.Fragment>
            <SunEditor
                setContents={value}
                onChange={setValue}
                setOptions={options}
            />
        </React.Fragment>
    );
};

export default PlainEditor;