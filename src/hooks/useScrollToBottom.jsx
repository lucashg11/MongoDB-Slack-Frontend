import { useEffect, useRef } from 'react'

const useScrollToBottom = (dependencies = []) => {
	const scrollRef = useRef(null)

	const scrollToBottom = () => {
		if (scrollRef.current) {
			const { scrollHeight, clientHeight } = scrollRef.current
			scrollRef.current.scrollTo({
				top: scrollHeight - clientHeight,
				behavior: 'smooth'
			})
		}
	}

	useEffect(() => {
		scrollToBottom()
	}, [...dependencies])

	return scrollRef
}

export default useScrollToBottom
