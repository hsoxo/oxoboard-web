import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import JoinRoom from '@/pages/Welcome/JoinRoom'
import Login from '@/pages/Welcome/Login'
import { animated, useSpring } from 'react-spring'
import { Divider, LinearProgress } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { reduxAction, useSelector } from '@/store'
import selectors from '@/store/selectors'
import CreateRoom from '@/pages/Welcome/CreateRoom'
import { sNickname, sToken } from '@/utils/storage'
import { getUserInfo } from '@/api/user'
import { globalActions } from '@/store/global/slice'

const Welcome = () => {
  const [currentSlide, setSlide] = useState(0)
  const [loading, setLoading] = useState(true)
  const props = useSpring({ transform: `translateX(-${currentSlide * 120}%)` })
  const userInfo = useSelector(selectors.kvGlobal('userInfo'))

  useEffect(() => {
    const token = sToken.get()
    if (token) {
      getUserInfo().then((r: any) => {
        sToken.set(r.accessToken)
        sNickname.set(r.userInfo.nickname)
        reduxAction(globalActions.setUserInfo(r.userInfo))
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [])

  return (
    <Wrapper>
      {loading ? (
        <LinearProgress />
      ) : (
        <LoginWrapper>
          <div className="site-title">OxO Whiteboard</div>

          <animated.div style={props}>
            <FormWrapper>
              <Slide1>
                <JoinRoom />
              </Slide1>
              <Slide2>
                {userInfo && userInfo.username ? <CreateRoom /> : <Login />}
              </Slide2>
            </FormWrapper>
          </animated.div>

          <Divider style={{ margin: '10px 20px' }} />

          {currentSlide === 1 ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setSlide(0)}
            >
              加入房间
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setSlide(1)}
            >
              {userInfo && userInfo.username ? '创建房间' : '登陆'}
            </Button>
          )}
        </LoginWrapper>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`
const LoginWrapper = styled.div`
  margin: 5px 40px;
  min-height: 45vh;
  min-width: 450px;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: space-evenly;
  padding: 2rem;
  box-shadow: 2px 2px 49px 20px rgba(204, 204, 204, 1);
  border-radius: 3rem;
  overflow: hidden;
  .site-title {
    font-family: 'SwankyandMooMoo', sans-serif;
    font-weight: bold;
    font-size: 4rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
  }
`
const FormWrapper = styled.div`
  position: relative;
  height: 220px;
`
const Slide1 = styled.div`
  display: inline-block;
  width: 100%;
  position: absolute;
  left: 0;
`
const Slide2 = styled.div`
  display: inline-block;
  width: 100%;
  position: absolute;
  left: 120%;
`

export default Welcome
