import PropTypes from "prop-types";

CommunityHeader.propTypes = {
  title: PropTypes.string
}

function CommunityHeader({title}) {
  return (
    <div className="p-5 border-b-4 text-center mt-4 grow">
      <h1 className="inline-block font-bold text-xl">{title}</h1>
    </div>
  )
}

export default CommunityHeader;