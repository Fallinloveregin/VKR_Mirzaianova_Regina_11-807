import { useCallback } from 'react'
import { useModal } from 'mui-modal-provider'

/**
 * Hook for static modal usage
 *
 * props function must return onConfirm action
 * if onConfirm returns a promise, loading state gonna be provided to component
 *
 * @example
 * const confirmAccountDisable = useDialog({
 *   component: Dialog.Confirmation,
 *   props: ({ item, close }) => ({
 *     title: 'Disable Account?',
 *     description: 'All account users will no longer be able to use the applications.',
 *     rejectLabel: 'Cancel',
 *     confirmLabel: 'Disable',
 *     onReject: () => close(),
 *     onConfirm: async () => {
 *       await onToggleDisable(item)
 *       await new Promise(resolve => setTimeout(resolve, 5000))
 *       close()
 *     },
 *   }),
 * })
 */
export default function useDialog({ props, component }) {
  const { showModal, hideModal, updateModal } = useModal()

  return useCallback(
    item => {
      const propsResult = props({ item, close: () => hideModal(modal.id) })

      const handleConfirm = (...args) => {
        const confirmResult = propsResult.onConfirm(...args)
        if (confirmResult instanceof Promise) {
          updateModal(modal.id, { loading: true })
          confirmResult.catch(() => updateModal(modal.id, { loading: false }))
        }
        return confirmResult
      }

      const modal = showModal(component, { ...propsResult, onConfirm: handleConfirm })
    },
    [component, hideModal, props, showModal, updateModal]
  )
}
