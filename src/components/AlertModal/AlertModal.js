import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

const AlertModal = (props) => (
        <Alert variant="danger">
            {props.text}
        </Alert>
)

export default AlertModal