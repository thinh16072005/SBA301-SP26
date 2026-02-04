import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { accountService } from '../services/accountService'

function RequireAuth({ allowedRoles, children }) {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!accountService.isAuthenticated()) {
      navigate('/login', { replace: true, state: { from: location } })
      return
    }
    const role = accountService.getRole()
    if (allowedRoles && !allowedRoles.includes(role)) {
      navigate('/forbidden', { replace: true })
    }
  }, [navigate, location, allowedRoles])

  return children
}

export default RequireAuth
