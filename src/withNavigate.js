import { useNavigate, useParams } from 'react-router-dom';

// HOC to add navigation and params to class component
function withNavigate(Component) {
  return function WithNavigateProps(props) {
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} navigate={navigate} params={params} />;
  };
}

export default withNavigate;
