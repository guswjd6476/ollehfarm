import React from "react"
import { useMediaQuery } from "react-responsive"

const Mobile = ({children}) => {
  const isMobile = useMediaQuery({maxWidth: 767});

  return <React.Fragment>{isMobile && children}</React.Fragment>
}
const Tablet = ({children}) => {
  const isTablet = useMediaQuery({minWidth: 768, maxWidth:1023});
  return <React.Fragment>{isTablet && children}</React.Fragment>
}

const PC = ({children}) => {
  const isPc = useMediaQuery({minWidth: 1024});
  return <React.Fragment>{isPc && children}</React.Fragment>
}

export  {Mobile,PC,Tablet};