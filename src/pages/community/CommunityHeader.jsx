import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

CommunityHeader.propTypes = {
  title: PropTypes.string
}

function CommunityHeader({title}) {
  const navigate = useNavigate();
  return (
    <div className="p-5 text-center grow" onClick={() => navigate('/community')}>
      <h1 className="inline-block font-bold text-xl md:text-2xl pl-24 xl:text-3xl">{title}</h1>
    </div>
  )
}

export default CommunityHeader;