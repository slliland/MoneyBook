import { useNavigate } from 'react-router-dom';

// This HOC wraps class components and passes the navigate function
const withNavigate = (Component) => {
  return (props) => {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
};

export default withNavigate;
