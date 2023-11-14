import {BsFillSunFill, BsFillMoonFill} from 'react-icons/bs'
import Wrapper from './ThemeToggle.wrapper.js'
import { useDashboardContext } from '../../pages/Dashboard/DashboardLayout.jsx'

const ThemeToggle = () => {
  const {isDarkTheme, toggleDarkTheme} = useDashboardContext()

  return (
    <Wrapper>
      {isDarkTheme ? <BsFillSunFill onClick={toggleDarkTheme} className='toggle-icon' /> : <BsFillMoonFill onClick={toggleDarkTheme} />}
    </Wrapper>
  )
}

export default ThemeToggle