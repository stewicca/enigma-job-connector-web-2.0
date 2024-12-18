import enigma from '@/assets/black.png';
import PropTypes from 'prop-types';

const Enigma = ({ size }) => {
    return <img src={enigma} alt='Enigma' width='100' height='100' className={`w-${size} h-${size}`} />
}

Enigma.propTypes = {
    size: PropTypes.string
}

export default Enigma;
