import { Link } from "react-router-dom"
import CommunityHeader from "./CommunityHeader"
import Vector from "./image/Vector"

function CommunityDetail() {
  return (
    <div>
      <Link to="/community" className="absolute left-6 top-10"><Vector /></Link>
      <div className="px-5 box-border flex flex-col">
        <CommunityHeader title={'상세보기'}/>
      </div>
    </div>
  )
}

export default CommunityDetail