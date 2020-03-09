import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
}
global.localStorage = localStorageMock

const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
}
global.sessionStorage = sessionStorageMock

const geolocationMock = {
  getCurrentPosition: jest.fn()
}
global.navigator.geolocation = geolocationMock

configure({ adapter: new Adapter() })
