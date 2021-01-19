import React, {Component} from 'react'
import {DropzoneArea} from 'material-ui-dropzone'

class DropzoneAreaExample extends Component{
    constructor(props: Readonly<{}>){
        super(props);
        this.state = {
            files: []
        };
    }
    handleChange(files: File[]){
        this.setState({
            files: files
        });
    }
    render(){
        return (
            <DropzoneArea
                onChange={this.handleChange.bind(this)}
                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                showPreviews={true}
                maxFileSize={5000000}
            />
        )
    }
}

export default DropzoneAreaExample;