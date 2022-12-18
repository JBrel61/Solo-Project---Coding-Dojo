import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

const Index = () => {
    return (
        <div>
            <div className="indexMain">
                <div>
                    <div>
                    <Button variant="outline-light" size="lg" href="/devs/register">Dev Register</Button>
                    </div>
                </div>
                <div>
                    <div>
                    <Button variant="outline-light" size="lg" href="/devs/login">Dev Login</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;