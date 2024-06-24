import React from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const EditorComponent = (props) => {

    // ERROR MESSAGE STATE
    const [errMsg, setErrMsg] = props.errors;
    // SUCCESS MESSAGE STATE
    const [successMsg, setSuccessMsg] = props.success;

    // HTML DATA INSIDE TEXT EDITOR
    const [value, setValue] = props.data;

    // FORM SUBMITION
    const page = props.submit;

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
            <div className="container-fluid py-4">
                <div className="row my-4">
                    <div className="col-md-12 mb-md-0 mb-4">
                        {/* DISPLAY ERROR MESSAGE */}
                        {errMsg.status &&
                            <div className="alert alert-danger alert-dismissible fade show text-white" role="alert">{errMsg.message}<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => {
                                setErrMsg({
                                    status: false,
                                    message: '',
                                });
                            }}></button>
                            </div>
                        }

                        {/* DISPLAY SUCCESS MESSAGE */}
                        {successMsg.status &&
                            <div className="alert alert-success alert-dismissible fade show text-white" role="alert">{successMsg.message}<button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => {
                                setSuccessMsg({
                                    status: false,
                                    message: '',
                                });
                            }}></button>
                            </div>
                        }
                        <div className="g-4">
                            <div className="card mb-3">
                                <div className="card-body p-md-5">
                                    <h4>Description</h4>
                                    <form onSubmit={page}>
                                        <div className="row">
                                            <div className="mb-4 p-0">
                                                <SunEditor
                                                    setContents={value}
                                                    onChange={setValue}
                                                    setOptions={options}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <input type="submit" className="btn btn-outline-primary btn-sm mb-0" value='Save' />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default EditorComponent;
