import React from 'react'

class ModelErrorBoundary extends React.Component {
  constructor(props){
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // log error for debugging
    console.error('ModelErrorBoundary caught error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      const pos = this.props.fallbackPosition || [0, 0, 0]
      return (
        <mesh position={pos} rotation={[0, Math.PI / 5, 0]} scale={1.5}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial color={this.props.color || 'red'} />
        </mesh>
      )
    }

    return this.props.children
  }
}

export default ModelErrorBoundary
