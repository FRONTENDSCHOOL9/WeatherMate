import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

CommunityHeader.propTypes = {
  title: PropTypes.string
}

function CommunityHeader({title}) {
  const navigate = useNavigate();
  return (
    <div className="p-5 border-b-4 text-center mt-4 grow" onClick={() => navigate('/community')}>
      <h1 className="inline-block font-bold text-xl">{title}</h1>
    </div>
  )
}

export default CommunityHeader;