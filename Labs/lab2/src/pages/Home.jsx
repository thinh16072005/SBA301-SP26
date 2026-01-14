import { Container } from 'react-bootstrap';
import OrchidList from '../components/OrchidList.jsx';

function Home({ searchQuery = '' }) {
    return (
        <Container className='flex-grow-1 py-5 text-center'>
            <header className="text-center">
                <h1>Orchid Shop</h1>
            </header>
            <OrchidList searchQuery={searchQuery} />
        </Container>
    )
}

export default Home;