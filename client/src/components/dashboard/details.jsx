import _ from 'underscore';
import moment from 'moment';

export const userDetails = (user_data, user_details) => {
    if(!_.isEmpty(user_details)) {
        const imageSrc = 'data:' + user_details.response.imageType + ';base64, '+ user_details.response.imageData;
        const date = moment(user_details.response.doj).format('MMMM Do YYYY');
        return(
            <div className='user_panel col-sm-3'> 
                <div className='avatar'>
                    <img src={imageSrc} alt="avatar"/>
                    <span>{user_data.response.username}</span>
                </div>
                <div className='user_details'>
                    <p><span>Occupation:</span> {user_details.response.jobTitle}</p>
                    <p><span>Salary:</span> {user_details.response.salary}</p>
                    <p><span>Date of Join:</span> {date}</p>
                    <p><span>Qualification:</span> {user_details.response.education}</p>
                    <p><span>City:</span> {user_details.response.city}</p>
                </div>
            </div>   
        )
    } else {
        return (
            <div>
                No Record Found
            </div>
        )
    } 
}
