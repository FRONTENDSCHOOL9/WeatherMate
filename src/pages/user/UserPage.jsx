/* eslint-disable */
import React from 'react'
import { Link } from 'react-router-dom'

function UserPage() {
  return (
    <>
    <div>마이페이지</div>

    <Link
    to="/user/login"
    className="flex flex-col items-center px-2 text-primary"
  >
    <p className="text-nowrap">로그인</p>
  </Link>
  </>
  )
}

export default UserPage;