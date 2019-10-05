/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
import React from 'react'
import Proptypes from 'prop-types'
import { Link } from 'gatsby'
import useBreadcrumb from './useBreadcrumb'

const AutoGenCrumb = ({
  title = '',
  crumbSeparator,
  crumbWrapperStyle,
  crumbActiveStyle,
  crumbStyle,
  crumbs: autoGenCrumbs,
  crumbLabel: crumbLabelOverride = null,
  ...rest
}) => {
  const { useClassNames } = useBreadcrumb({})
  return (
    <div>
      <span>{title}</span>
      {autoGenCrumbs.map((c, i) => {
        return (
          <div
            className="breadcrumb"
            style={
              useClassNames ? null : { display: 'inline', ...crumbWrapperStyle }
            }
            key={i}
          >
            <Link
              to={c.pathname}
              style={
                useClassNames
                  ? null
                  : {
                      textDecoration: 'none',
                      fontSize: '16pt',
                      color: '#e1e1e1',
                      ...crumbStyle,
                    }
              }
              activeStyle={
                useClassNames
                  ? null
                  : {
                      color: 'white',
                      ...crumbActiveStyle,
                    }
              }
              className="breadcrumb__link"
              activeClassName={
                useClassNames ? 'breadcrumb__link__active' : null
              }
              {...rest}
            >
              {crumbLabelOverride && i === autoGenCrumbs.length - 1
                ? crumbLabelOverride
                : c.crumbLabel}
            </Link>
            <span
              className="breadcrumb__separator"
              style={useClassNames ? null : { fontSize: '16pt', ...crumbStyle }}
            >
              {i === autoGenCrumbs.length - 1 ? null : crumbSeparator}
            </span>
          </div>
        )
      })}
    </div>
  )
}

AutoGenCrumb.defaultProps = {
  title: '',
  crumbSeparator: ' / ',
  crumbWrapperStyle: {},
  crumbStyle: {},
  crumbActiveStyle: {},
  crumbLabel: null,
  useClassNames: false,
}

AutoGenCrumb.propTypes = {
  title: Proptypes.string,
  crumbSeparator: Proptypes.string,
  crumbWrapperStyle: Proptypes.shape(),
  crumbActiveStyle: Proptypes.shape(),
  crumbStyle: Proptypes.shape(),
  crumbs: Proptypes.arrayOf(
    Proptypes.shape({
      location: Proptypes.shape(),
      pathname: Proptypes.string.isRequired,
    }),
  ).isRequired,
  crumbLabel: Proptypes.string,
  useClassNames: Proptypes.bool,
}

export default AutoGenCrumb
