import { auth, signOut } from "../../module/firebase";
import { useHistory} from "react-router-dom";
import Quotes from "../Quotes/Quotes";

const Birthday = () => {
let now = new Date();
const birthday = localStorage.getItem('birthday');
const name = localStorage.getItem('name');
const history = useHistory();

//validation of birthday day
    let parts = birthday.split('-')
    let year = parts[0];
    let month = parseInt(parts[1], 10) - 1;
    let date = parts[2];
    let bday = new Date(year, month, date)
    let one_day = 24 * 60 * 60 * 1000;
    let upcomingBday = new Date(now.getFullYear(), bday.getMonth(), bday.getDate());

    if(now > upcomingBday) {
        upcomingBday.setFullYear(now.getFullYear() + 1);
      }

    let daysLeft = Math.ceil((upcomingBday.getTime() - now.getTime()) / (one_day));
    //leap year
    for(let i = bday.getFullYear(); i <= now.getFullYear(); i++) {
        if(((i % 4 === 0) && (i % 100 !== 0)) || (i % 400 === 0)) {
            daysLeft += 1;
        }
    }

const logoutUser = () => {
    signOut(auth)
        .then(() => {
            // Sign-out successful.
            localStorage.removeItem('name')
            history.push("/login")
        })
        .catch((error) => {
            console.log(error)
        });
}

    return (
        <div className="container">
        <div className="column">
            <div className="d-flex justify-content-end">
                <div className="d-flex justify-content-end m-2">
                    <p className="m-2">Hi, {name}</p>
                    <button id="logout" className="btn btn-primary" onClick={logoutUser}>Logout</button>
                </div>                            
            </div>
            <div className="container col-lg-5 bg-info">
                <div className="row d-flex justify-content-center">
                    {
                        (now.getMonth() === bday.getMonth() && now.getDate() === bday.getDate()) ? (
                            <div className="row d-flex justify-content-center">
                                <div>
                                    <p className="fw-bold h2">Happy Birthday, {name}!</p>
                                </div>
                                <div id="quote" className="m-2 d-flex justify-content-start">
                                    <Quotes />
                                </div>
                            </div>
                        ): (
                            <div id="birthday" className="row d-flex justify-content-center">
                                <p className="fw-bold h2 p-1">Hi, {name}!</p>
                                <p className="fw-bold h3 p-1">{daysLeft} days left</p>
                                <p className="fw-bold p-1 ">UNTIL YOUR BIRTHDAY!</p>
                            </div> 
                        )
                    }                                       
                </div>
            </div>
        </div>
    </div>
    )
}

export default Birthday;