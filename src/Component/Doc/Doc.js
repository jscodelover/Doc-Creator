import React, { Component } from 'react';
import AceEditor from 'react-ace';

import Fire from '../Fire/Fire';
import 'brace/mode/html';
import 'brace/theme/github';
import './Doc.css';

const modes = [
  'javascript',
  'java',
  'python',
  'xml',
  'ruby',
  'sass',
  'markdown',
  'mysql',
  'json',
  'html',
  'handlebars',
  'golang',
  'csharp',
  'elixir',
  'typescript',
  'css'
]

const themes = [
  'monokai',
  'github',
  'tomorrow',
  'kuroir',
  'twilight',
  'xcode',
  'textmate',
  'solarized_dark',
  'solarized_light',
  'terminal',
]

modes.forEach((lang) => {
  require(`brace/mode/${lang}`)
})

themes.forEach((theme) => {
  require(`brace/theme/${theme}`)
})

const database = Fire.database();

class Doc extends Component{
	constructor(props)
  {
        super(props);
        this.state={
        	value:'',
        	mode:'html',
        	theme:'github',
        	fontSize: 14,
        	width: "400px",
        	id:props.match.params.id,
          chat: 'Talk Here !!!',
          participant : 0
        }
        this.onChange = this.onChange.bind(this);
        this.setTheme = this.setTheme.bind(this);
        this.setMode = this.setMode.bind(this);
        this.setFontSize = this.setFontSize.bind(this);
        this.handleChat = this.handleChat.bind(this);
    }
    updateDimensions= ()=>{
    	const width=window.innerWidth;
    	if(width>=992)
    		this.setState({width : "650px"})
    	else if(width <992 && width > 575)
    		this.setState({width : "500px"})
    	else if(width < 576 && width > 426)
    		this.setState({width : "300px"})
    	else
    		this.setState({width : "200px"})
    }

    componentDidMount(){
    	this.updateDimensions();
  		window.addEventListener("resize", this.updateDimensions);

  		database.ref("Doc/"+this.state.id).on('value', snapshot => {
          let editor = snapshot.val();
          if(editor)
          {
              if(editor.text)
              this.setState({value : editor.text});
              if(editor.chat)
                this.setState({chat : editor.chat});
              if(editor.mode && editor.mode !== this.state.mode)
                this.setState({mode : editor.mode});
          }
  		});


      // No. of Participant
      var myConnectionsRef = database.ref('Doc/'+this.state.id+'/connections');
      database.ref('.info/connected').on('value', snap => {
            if (snap.val() === true) {

              var con = myConnectionsRef.push();

              // When I disconnect, remove this device
              con.onDisconnect().remove();

              con.set(true);

              myConnectionsRef.on('value', snap => {
                let participant = Object.keys(snap.val()).length;
                this.setState({participant : participant});
                database.ref("Doc/"+this.state.id+"/participant").set(participant);
              })
            }
          });




	}

    onChange(newValue) {
    	database.ref("Doc/"+this.state.id+"/text").set(newValue);
    }

    setTheme(e) {
    	this.setState({theme: e.target.value});
    }

    setMode(e) {
    	this.setState({mode: e.target.value});
      database.ref("Doc/"+this.state.id+"/mode").set(e.target.value);
    }

    setFontSize(e) {
    	this.setState({fontSize: parseInt(e.target.value,10)});
    }
    handleChat(e) {
        this.setState({ chat : e.target.value})
        database.ref("Doc/"+this.state.id+"/chat").set(e.target.value);
    }
  render(){
    return (
    	<div className="row myrow">
	       	<div className="container">
	       	    <div className="row pl-4">
                  <div className="col">
                      <p className="display-4"> Profile : <span className="bg-dark text-white">{this.state.id}</span></p>
                      <p className="display-4"> Participant : <span className="bg-dark text-white">{this.state.participant}</span></p>
                  </div>
              </div>
	       		  <div className="row">
	       		    <div className="col-12 col-md-3">
	       		      <div className="row">
	       		      	<div className="col-12">
	       		      		<form id="editor_changes">
	       		      		  <div className="form-group">
	       		      		    <label className="h4">Mode</label>
	       		      		    <br />
	       		      		    <select className="form-control" onChange={this.setMode} value={this.state.mode}>
	       		      		        {
	       		      		            modes.map(lang => <option key={lang} value={lang}> {lang}</option>)
	       		      		        }
	       		      		     </select>
	       		      		  </div>
	       		      		  <div className="form-group">
	       		      		    <label className="h4">Theme</label>
	       		      		    <br />
	       		      		    <select className="form-control" onChange={this.setTheme} value={this.state.theme}>
	       		      		         {
	       		      		         	themes.map(theme => <option key={theme} value={theme}>{theme}</option>)
	       		      		         }
	       		      		    </select>
	       		      		  </div>
	       		      		  <div className="form-group">
	       		      		    <label className="h4">Font Size</label>
	       		      		    <br />
	       		      		    <select className="form-control" onChange={this.setFontSize} value={this.state.fontSize}>
	       		      		      { [14,16,18,20,24,28,32,40].map((size) => <option  key={size} value={size}>{size}</option>)}
	       		      		    </select>
	       		      		  </div>
                        <div className="form-group">
                           <label className="h4">Chat</label>
                           <textarea className="form-control" rows="3" onChange={this.handleChat} value={this.state.chat} />
                         </div>
	       		      		</form>
	       		      	</div>
	       		      </div>
	       		    </div>
	       		    <div className="col-12 col-md-9">
	       		      	<AceEditor
	       		            mode={this.state.mode}
	       		            theme={this.state.theme}
	       		            fontSize={this.state.fontSize}
	       		            onChange={this.onChange}
	       		            name="UNIQUE_ID_OF_DIV"
	       		            width={this.state.width}
	       		            value={this.state.value}
	       		            editorProps={{ $blockScrolling: true }}
	       		        />
	       		    </div>
	       		  </div>
	       	</div>
	    </div>
    );
  }
}

export default Doc;
