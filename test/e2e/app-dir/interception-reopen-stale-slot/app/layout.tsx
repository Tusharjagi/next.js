import { OpenSearchButton } from './open-search-button'

export default function Layout(props: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html>
      <body>
        <OpenSearchButton />
        <div id="children">{props.children}</div>
        <div id="modal">{props.modal}</div>
      </body>
    </html>
  )
}
