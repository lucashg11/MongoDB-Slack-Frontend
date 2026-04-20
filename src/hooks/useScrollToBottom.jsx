import { useEffect, useRef } from 'react'

/**
 * Hook para manejar el scroll automático al final de un contenedor
 * cuando cambian sus dependencias (ej. nuevos mensajes).
 * 
 * @param {Array} dependencies - Lista de dependencias que disparan el scroll
 * @returns {import('react').RefObject} scrollRef - Referencia para el contenedor
 */
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
