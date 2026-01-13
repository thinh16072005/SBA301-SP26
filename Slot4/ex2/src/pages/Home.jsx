import { Container } from 'react-bootstrap';
import OrchidList from '../components/OrchidList.jsx';

function Home() {
    return (
        <Container className='flex-grow-1 py-5 text-center'>
            <OrchidList />
        </Container>
    )
}

export default Home;