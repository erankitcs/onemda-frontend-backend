import React, {Component} from 'react';
import SelectBox from '../../common/SelectBox/index'
import * as constants from '../../constants/enumeration'
import RadioButtonMulti from '../../common/RadioButtonMulti/index'
import Emoji from '../../common/Emoji/index'
class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      newProgramDetails: {
        instructor_id : "11090442",
        instructor_name:"John Doe",
        program: "",
        subCategory: "",
        submittedAt:""
      },
      submittedData:null
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    // this.state={
    //   newProgramDetails:{
    //     "instructor_id" : "ABC123",
    //     "instructor_name" : "ABC123",
    //     "session_date": "23-11-2018",
    //     "session_time":"Morning",
    //     "submittedAt": "23-11-2018",
    //     "activity_name": "Cricket",
    //     "service_category" : ["Sport","Health"],
    //     "participants" : [
    //       {
    //         "participant_id" : "xyz123" ,
    //         "participant_name" : "Ankit Singh" ,
    //         "instructor_feedback" : "1",
    //         "instructor_comment" : "comments from instructor",
    //         "participant_feedback" : "1"
    //       },
    //       {
    //         "participant_id" : "xyz1234" ,
    //         "participant_name" : "NIkhil" ,
    //         "instructor_feedback" : "1",
    //         "instructor_comment" : "comments from instructor",
    //         "participant_feedback" : "1"
    //       }
    //     ]
    //   }
    // }
  }
  handleInput=(e)=> {
    let value = e.target.value;
    let name = e.target.name;
    this.setState(prevState => ({
        newProgramDetails: {...prevState.newProgramDetails, [name]: value}
      }),
      () => console.log(this.state.newProgramDetails)
    );
  }

  loginSubmitHandler=()=>{

  }
  getCategories=()=>{
    if(this.state.newProgramDetails && this.state.newProgramDetails.program === 'Learning'){
      return constants.LearningCategories
    } else if(this.state.newProgramDetails && this.state.newProgramDetails.program === 'Social & Rec'){
      return constants.SocialCategories
    } else if(this.state.newProgramDetails && this.state.newProgramDetails.program === 'Health & Wellbeing'){
      return constants.HealthCategories
    } else {}
  }

  isCategoryPresent=()=>{
    if(this.state.newProgramDetails && this.state.newProgramDetails.program){
      return true
    } else {
      return false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      "instructor_id" : "ABC12345",
      "instructor_name" : "ABC123",
      "session_date": "23-11-2018",
      "session_time":"Morning",
      "submittedAt": "23-11-2018",
      "activity_name": "Cricket",
      "service_category" : ["Sport","Health"],
      "participants" : [
                            {
                              "participant_id" : "xyz123" ,
                              "participant_name" : "Ankit Singh" ,
                              "instructor_feedback" : "1",
                              "instructor_comment" : "comments from instructor",
                              "participant_feedback" : "1"
                            },
                            {
                              "participant_id" : "xyz1234" ,
                              "participant_name" : "NIkhil" ,
                              "instructor_feedback" : "1",
                              "instructor_comment" : "comments from instructor",
                              "participant_feedback" : "1"
                            }
                        ]
     }

    fetch('http://localhost:8099/api/onemda/instructorfeedback', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    console.log('submitted')
  }

  render(){
    const {instructor_id} = this.state.newProgramDetails
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h2>Daily Activity Evaluation</h2>
          </div>

        </div>
        <hr/>
        <form className="form-horizontal">
          <div className="form-group row">
            <div className="col-sm-2 col-6">Instructor Name: </div>
            <div className="col-sm-3 col-6">
              John Doe
            </div>
            <div className="col-sm-2 col-6">Instructor Id: </div>
            <div className="col-sm-3 col-6">
              {instructor_id}
            </div>
          </div>
          <SelectBox
            label="Service category: "
            id="program"
            name="program"
            value={this.state.newProgramDetails.program}
            data={constants.ProgramCategory}
            handleChange={this.handleInput}/>
          {this.isCategoryPresent() && <SelectBox
            label="Activity: "
            id="subCategory"
            name="subCategory"
            value={this.state.newProgramDetails.subCategory}
            data={this.getCategories()}
            handleChange={this.handleInput}/>}
          <div className="form-group row">
            <label htmlFor='date' className="col-sm-2 col-form-label">Date: </label>
            <div className="col-sm-9">
              <input type='date' className="form-control" id='date' name='date'/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor='session' className="col-sm-2 col-form-label">Session Time</label>
            <div className="col-sm-6" id="session">
              <RadioButtonMulti
                label="choose one"
                id="session"
                name="developmentOutcome"
                data={constants.TimeConvention}/>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12 mb-20px">My Enjoyment in learning activities is:</div>
            <div className="col-sm-12">
              <Emoji
                id="emotions"
                name="smilyes"
                value={this.state.newProgramDetails.subCategory}
                data={constants.Emotions}

              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-12">My Participation in learning activities is:</div>
            <div className="col-sm-12 mt-20px">
              <Emoji
                id="emotions"
                name="participation"
                value={this.state.newProgramDetails.subCategory}
                data={constants.Emotions}
              />
            </div>
          </div>
        <div className="form-group row">
          <button type="submit">Submit</button>
        </div>
        </form>
      </div>
    )
  }
}

export default Login;