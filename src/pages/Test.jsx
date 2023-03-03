import React from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";

const Test = () => {
	return (
		<div>
			hi
			<MarkdownEditor
				value="Hello World!
                # hi
                ### hi
                
                `hi
                sdfjs;kj`
                "
				onChange={(value) => console.log(value)}
			/>
		</div>
	);
};

export default Test;
