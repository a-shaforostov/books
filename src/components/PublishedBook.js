import React, { Component, Fragment } from 'react';
import injectSheet from 'react-jss';
import classnames from 'classnames';
import flow from 'lodash/flow';

import { Segment, Icon, Popup } from 'semantic-ui-react';

import styles from './PublishedBook.styles';
// import { DragSource, dragPreview } from "react-dnd/lib/index";
import { DragSource } from 'react-dnd';


class PublishedBook extends Component {
  componentDidMount() {
    const img = new Image();
    img.height = 64;
    img.onload = () =>
      this.props.connectDragPreview && this.props.connectDragPreview(img);
    img.src = 'data:image/png;base64,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';
    // img.src = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgd2lkdGg9IjQwIgogICBoZWlnaHQ9IjcwIgogICBpZD0ic3ZnNDM4OSIKICAgdmVyc2lvbj0iMS4xIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjQ4LjIgcjk4MTkiCiAgIHNvZGlwb2RpOmRvY25hbWU9IkJvb2sgaWNvbiAoY2xvc2VkKSAtIEJsdWUgYW5kIGdvbGQuc3ZnIj4KICA8ZGVmcwogICAgIGlkPSJkZWZzNDM5MSI+CiAgICA8bGluZWFyR3JhZGllbnQKICAgICAgIGlua3NjYXBlOmNvbGxlY3Q9ImFsd2F5cyIKICAgICAgIHhsaW5rOmhyZWY9IiNsaW5lYXJHcmFkaWVudDQwMTUiCiAgICAgICBpZD0ibGluZWFyR3JhZGllbnQ0MDIxIgogICAgICAgeDE9IjQ1OS4zNTE5MyIKICAgICAgIHkxPSIxMTQuMzE4NzMiCiAgICAgICB4Mj0iNDQyLjk3OTE2IgogICAgICAgeTI9IjExNC4zMTg3MyIKICAgICAgIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIgogICAgICAgZ3JhZGllbnRUcmFuc2Zvcm09InRyYW5zbGF0ZSgxNTMuNTA2NjYsMTc5LjU4Mzk3KSIgLz4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgaWQ9ImxpbmVhckdyYWRpZW50NDAxNSI+CiAgICAgIDxzdG9wCiAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiNmZmZmZmY7c3RvcC1vcGFjaXR5OjAuMzc2MDY4Mzg7IgogICAgICAgICBvZmZzZXQ9IjAiCiAgICAgICAgIGlkPSJzdG9wNDAxNyIgLz4KICAgICAgPHN0b3AKICAgICAgICAgaWQ9InN0b3A0MDIzIgogICAgICAgICBvZmZzZXQ9IjAuNDAwODU0OTUiCiAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiM1YzVjNWM7c3RvcC1vcGFjaXR5OjAuMDg1NDcwMDk7IiAvPgogICAgICA8c3RvcAogICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojMWYxZjFmO3N0b3Atb3BhY2l0eTowLjQ0NDQ0NDQ1OyIKICAgICAgICAgb2Zmc2V0PSIxIgogICAgICAgICBpZD0ic3RvcDQwMTkiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaWQ9ImJhc2UiCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6em9vbT0iMSIKICAgICBpbmtzY2FwZTpjeD0iMTcuMTA0OTE0IgogICAgIGlua3NjYXBlOmN5PSI1Ni4wMjQ5NzIiCiAgICAgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9InB4IgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9Imc0MDQ2IgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTpvYmplY3Qtbm9kZXM9InRydWUiCiAgICAgc2hvd2d1aWRlcz0idHJ1ZSIKICAgICBpbmtzY2FwZTpndWlkZS1iYm94PSJ0cnVlIgogICAgIGlua3NjYXBlOnNuYXAtZ3JpZHM9InRydWUiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxNDg1IgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9Ijg3NiIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMTE1IgogICAgIGlua3NjYXBlOndpbmRvdy15PSIwIgogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiPgogICAgPGlua3NjYXBlOmdyaWQKICAgICAgIHR5cGU9Inh5Z3JpZCIKICAgICAgIGlkPSJncmlkNDk1OCIKICAgICAgIGVtcHNwYWNpbmc9IjUiCiAgICAgICB2aXNpYmxlPSJ0cnVlIgogICAgICAgZW5hYmxlZD0idHJ1ZSIKICAgICAgIHNuYXB2aXNpYmxlZ3JpZGxpbmVzb25seT0idHJ1ZSIKICAgICAgIG9yaWdpbnk9IjBweCIKICAgICAgIG9yaWdpbng9IjBweCIgLz4KICAgIDxpbmtzY2FwZTpncmlkCiAgICAgICB0eXBlPSJheG9ub21ncmlkIgogICAgICAgaWQ9ImdyaWQ0OTYwIgogICAgICAgdW5pdHM9Im1tIgogICAgICAgZW1wc3BhY2luZz0iNSIKICAgICAgIHZpc2libGU9InRydWUiCiAgICAgICBlbmFibGVkPSJmYWxzZSIKICAgICAgIHNuYXB2aXNpYmxlZ3JpZGxpbmVzb25seT0idHJ1ZSIKICAgICAgIHNwYWNpbmd5PSIwLjVtbSIgLz4KICA8L3NvZGlwb2RpOm5hbWVkdmlldz4KICA8bWV0YWRhdGEKICAgICBpZD0ibWV0YWRhdGE0Mzk0Ij4KICAgIDxyZGY6UkRGPgogICAgICA8Y2M6V29yawogICAgICAgICByZGY6YWJvdXQ9IiI+CiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+CiAgICAgICAgPGRjOnR5cGUKICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPgogICAgICAgIDxkYzp0aXRsZT48L2RjOnRpdGxlPgogICAgICA8L2NjOldvcms+CiAgICA8L3JkZjpSREY+CiAgPC9tZXRhZGF0YT4KICA8ZwogICAgIGlua3NjYXBlOmxhYmVsPSJMYXllciAxIgogICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiCiAgICAgaWQ9ImxheWVyMSIKICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC05ODIuMzYyMTgpIj4KICAgIDxnCiAgICAgICBzdHlsZT0iZmlsdGVyOnVybCgjZmlsdGVyNDMyOCkiCiAgICAgICBpZD0iZzQwNDYiCiAgICAgICB0cmFuc2Zvcm09Im1hdHJpeCgtMC40NjkxNDY1MiwwLDAsMC40NjkxNDY1MiwyOTIuNzAxNCw4ODcuNjE1NzkpIj4KICAgICAgPHBhdGgKICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgICAgaWQ9InBhdGg0MDQyIgogICAgICAgICBkPSJtIDU2NC41NTM4NiwzMDQuMzE3MTggNDkuNzU2MTIsMjguNzI2NzIgMCwtOTcuNjcwODIgLTQ5LjAyNTE5LC0yOC43MjY3MiB6IgogICAgICAgICBzdHlsZT0iZmlsbDojZWYyOTI5O2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lIgogICAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjY2NjIiAvPgogICAgICA8cGF0aAogICAgICAgICBzdHlsZT0iZmlsbDojZjJkN2FiO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTojODcwMDAwO3N0cm9rZS13aWR0aDoyLjU1NzgzNjI5MDAwMDAwMDAxO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1vcGFjaXR5OjE7c3Ryb2tlLWRhc2hhcnJheTpub25lIgogICAgICAgICBkPSJtIDYxMS45Nzg2NCwyMzUuMjg0MjcgMCwyLjYwNjc5IgogICAgICAgICBpZD0icGF0aDUxMjMiCiAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiIC8+CiAgICAgIDxwYXRoCiAgICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiNhNDAwMDA7c3Ryb2tlLXdpZHRoOjIuMTMxNTMwMjgwMDAwMDAwMjI7c3Ryb2tlLWxpbmVqb2luOnJvdW5kIgogICAgICAgICBkPSJtIDU2NC41NTM4NiwzMDQuMzE3MTggNDkuNzU2MTIsMjguNzI2NzIgMCwtOTcuNjcwODIgYyAwLDAgLTIuNTI1MjgsMC42MDc0MyAtMi45MDIwOCwtMS43MDA1IGwgLTQ2LjEyMzExLC0yNy4wMjYyMiB6IgogICAgICAgICBpZD0icGF0aDMxOTUiCiAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2NjY2NjIiAvPgogICAgICA8cGF0aAogICAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjY2NjIgogICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgICAgICBpZD0icGF0aDMyMDIiCiAgICAgICAgIGQ9Im0gNjE0LjMxOTg3LDI0MC4wMTAyNSBjIC0wLjUwNjcxLDcuMjk2NTggLTE3Ljg3NTYxLDExLjIxNTE3IC0xNy44NzU2MSwxMS4yMTUxNyBsIC00OC45MzAzOCwtMjguODc0MjUgYyA4LjE2MzU4LC0xLjY5OTQgMTUuMzYyMzYsLTEuODc2ODUgMTkuOTAyNDQsLTkuNDkyMzkgeiIKICAgICAgICAgc3R5bGU9ImZpbGw6I2QzZDdjZjtmaWxsLW9wYWNpdHk6MTtzdHJva2U6I2JhYmRiNjtzdHJva2Utd2lkdGg6Mi4xMzE1MzAyODtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmUiIC8+CiAgICAgIDxwYXRoCiAgICAgICAgIHN0eWxlPSJmb250LXNpemU6bWVkaXVtO2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtdmFyaWFudDpub3JtYWw7Zm9udC13ZWlnaHQ6bm9ybWFsO2ZvbnQtc3RyZXRjaDpub3JtYWw7dGV4dC1pbmRlbnQ6MDt0ZXh0LWFsaWduOnN0YXJ0O3RleHQtZGVjb3JhdGlvbjpub25lO2xpbmUtaGVpZ2h0Om5vcm1hbDtsZXR0ZXItc3BhY2luZzpub3JtYWw7d29yZC1zcGFjaW5nOm5vcm1hbDt0ZXh0LXRyYW5zZm9ybTpub25lO2RpcmVjdGlvbjpsdHI7YmxvY2stcHJvZ3Jlc3Npb246dGI7d3JpdGluZy1tb2RlOmxyLXRiO3RleHQtYW5jaG9yOnN0YXJ0O2Jhc2VsaW5lLXNoaWZ0OmJhc2VsaW5lO2NvbG9yOiMwMDAwMDA7ZmlsbDpub25lO3N0cm9rZTojZWVlZWVjO3N0cm9rZS13aWR0aDoyLjEzMTUzMDI4O21hcmtlcjpub25lO3Zpc2liaWxpdHk6dmlzaWJsZTtkaXNwbGF5OmlubGluZTtvdmVyZmxvdzp2aXNpYmxlO2VuYWJsZS1iYWNrZ3JvdW5kOmFjY3VtdWxhdGU7Zm9udC1mYW1pbHk6U2FuczstaW5rc2NhcGUtZm9udC1zcGVjaWZpY2F0aW9uOlNhbnMiCiAgICAgICAgIGQ9Im0gNTY3Ljg4MjYsMjE1LjYyMzEyIDQ0LjQ4NjM3LDI1Ljg0OTc4IGMgLTEuMTU2MjEsMS40OTgyMiAtMi40MTUxMywxLjg5MzQgLTMuODM1MzEsMi45Mjc0IC0zLjI2NzA4LDIuMzc4NjYgLTcuNzk3NzksMy4xNzg4OSAtMTEuODM5NSw0LjUyMDg4IEwgNTUzLjM4MjYsMjIzLjIxMzYgYyA2LjAwNDQ4LC0xLjMyMjAzIDEwLjkwMDY5LC0yLjk3OTg4IDE0LjUsLTcuNTkwNDggeiIKICAgICAgICAgaWQ9InBhdGg0OTc0IgogICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjc2NjYyIgLz4KICAgICAgPHBhdGgKICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgICAgaWQ9InBhdGgzMTkzIgogICAgICAgICBkPSJtIDU0Ni4xMDEwMiwzMTUuOTkxNjYgNDguMzA2NTMsMjguNTQyOTIgMCwtOTcuNjcwODMgLTQ4LjMwNjUzLC0yOC41NDI5MiB6IgogICAgICAgICBzdHlsZT0iZmlsbDojY2MwMDAwO2ZpbGwtb3BhY2l0eToxO3N0cm9rZTpub25lIgogICAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjY2NjIiAvPgogICAgICA8cGF0aAogICAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNzYyIKICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgICAgZD0ibSA1OTMuNDMwNTksMjQ2LjA4MTcgYyA2LjYzMDQ5LDAuODEzNTEgMTAuOTc1MTQsMC4xMTM4NiAxMy45MTAxNiwtMS41MDU0NiAzLjMyOTUsLTEuODM2OTYgNC42MTI3NiwtNC40NzA0IDUuMjA1MjQsLTcuMTYxMTYiCiAgICAgICAgIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlOiMyMDRhODc7c3Ryb2tlLXdpZHRoOjEuMzE0NTcyMDk5OTk5OTk5OTE7c3Ryb2tlLWxpbmVjYXA6cm91bmQiCiAgICAgICAgIGlkPSJwYXRoNDA0MCIgLz4KICAgICAgPHBhdGgKICAgICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjY2NjYyIKICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgICAgZD0ibSA2MTQuMzEwMDEsMzMzLjA0MzkgYyAwLDUuNzQ1MzMgLTQuOTc1NjEsMTQuMzYzMzQgLTE5LjkwMjQ2LDExLjQ5MDY4IGwgLTEwZS02LC05Ny42NzA4MyBjIDE0LjkyNjg1LDIuODcyNjcgMTkuOTAyNDUsLTUuNzQ1MzQgMTkuOTAyNDUsLTExLjQ5MDY3IHoiCiAgICAgICAgIHN0eWxlPSJmaWxsOiNjYzAwMDA7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmUiCiAgICAgICAgIGlkPSJwYXRoMzE5OSIgLz4KICAgICAgPHBhdGgKICAgICAgICAgaWQ9InBhdGgzOTg5IgogICAgICAgICBzdHlsZT0iZmlsbDp1cmwoI2xpbmVhckdyYWRpZW50NDAyMSk7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOm5vbmUiCiAgICAgICAgIGQ9Im0gNjE0LjMxMDAxLDMzNS4xNzU0NCBjIDAsNS43NDUzMyAtNC45NzU2MSwxNC4zNjMzNCAtMTkuOTAyNDYsMTEuNDkwNjggbCAtMTBlLTYsLTk3LjY3MDgzIGMgMTQuOTI2ODUsMi44NzI2NyAxOS45MDI0NSwtNS43NDUzNCAxOS45MDI0NSwtMTEuNDkwNjcgeiIKICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjY2NjYyIgLz4KICAgICAgPHBhdGgKICAgICAgICAgc3R5bGU9ImZvbnQtc2l6ZTptZWRpdW07Zm9udC1zdHlsZTpub3JtYWw7Zm9udC12YXJpYW50Om5vcm1hbDtmb250LXdlaWdodDpub3JtYWw7Zm9udC1zdHJldGNoOm5vcm1hbDt0ZXh0LWluZGVudDowO3RleHQtYWxpZ246c3RhcnQ7dGV4dC1kZWNvcmF0aW9uOm5vbmU7bGluZS1oZWlnaHQ6bm9ybWFsO2xldHRlci1zcGFjaW5nOm5vcm1hbDt3b3JkLXNwYWNpbmc6bm9ybWFsO3RleHQtdHJhbnNmb3JtOm5vbmU7ZGlyZWN0aW9uOmx0cjtibG9jay1wcm9ncmVzc2lvbjp0Yjt3cml0aW5nLW1vZGU6bHItdGI7dGV4dC1hbmNob3I6c3RhcnQ7YmFzZWxpbmUtc2hpZnQ6YmFzZWxpbmU7Y29sb3I6IzAwMDAwMDtmaWxsOm5vbmU7c3Ryb2tlOiNlZjI5Mjk7c3Ryb2tlLXdpZHRoOjIuMTMxNTMwMjgwMDAwMDAwMjI7c3Ryb2tlLW9wYWNpdHk6MTttYXJrZXI6bm9uZTt2aXNpYmlsaXR5OnZpc2libGU7ZGlzcGxheTppbmxpbmU7b3ZlcmZsb3c6dmlzaWJsZTtlbmFibGUtYmFja2dyb3VuZDphY2N1bXVsYXRlO2ZvbnQtZmFtaWx5OlNhbnM7LWlua3NjYXBlLWZvbnQtc3BlY2lmaWNhdGlvbjpTYW5zIgogICAgICAgICBkPSJtIDYxMi4xNjI5MSwyNDUuMTA4NjggMCw4Ny45Mzc1MSBjIDAsMi4yNTczNCAtMC43MTgxNyw1LjU3NzggLTMuMjcyMiw3LjY0MjIgLTIuMzIzMDYsMS44Nzc3MSAtNS43Mjc5NCwzLjE3Mzg4IC0xMS42Njk4NCwyLjM3NTQ2IGwgLTAuMDQ3MSwtOTMuNTQ3NTcgYyA2LjU0NjY5LDAuNzQ2NzIgMTAuODcwNTQsLTAuODc5NTggMTQuMTE0MTQsLTMuNTAxMzUgMC4zNDEzOCwtMC4yNzU5MyAwLjU3MDk3LC0wLjYxMDY4IDAuODc1LC0wLjkwNjI1IHoiCiAgICAgICAgIGlkPSJwYXRoNTA4NCIKICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjc3NjY3NjIiAvPgogICAgICA8cGF0aAogICAgICAgICBpZD0icGF0aDMyMTciCiAgICAgICAgIHN0eWxlPSJmaWxsOiNmY2U5NGY7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiNhNDAwMDA7c3Ryb2tlLXdpZHRoOjEuMzE0NTcyMDk5OTk5OTk5OTEiCiAgICAgICAgIGQ9Im0gNjE0LjMwOTk5LDI1Ni40NjM2OCBjIC0wLjUzNjM5LDEuNjY3MDUgLTcuMjY4Nyw4LjkxODAxIC0xOS45MDI0NSw3LjY0MzE0IGwgMCwtNC43Mjk1IGMgMTIuNjMzNzUsMS4yNzQ4NyAxOC4wNzYxOSwtNC43ODE0NCAxOS45MDI0NSwtNy45Nzg5NiB6IgogICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjY2NjIiAvPgogICAgICA8dXNlCiAgICAgICAgIHN0eWxlPSJzdHJva2U6I2E0MDAwMDtzdHJva2Utd2lkdGg6MS4zMTQ1NzIwOTk5OTk5OTk5MSIKICAgICAgICAgaGVpZ2h0PSIyMjUiCiAgICAgICAgIHdpZHRoPSIzMDAiCiAgICAgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03LjQwMDA1OTVlLTgsMTAuOTYzODY0KSIKICAgICAgICAgaWQ9InVzZTMyMTkiCiAgICAgICAgIHhsaW5rOmhyZWY9IiNwYXRoMzIxNyIKICAgICAgICAgeT0iMCIKICAgICAgICAgeD0iMCIgLz4KICAgICAgPHBhdGgKICAgICAgICAgaWQ9InBhdGgzMjA2IgogICAgICAgICBzdHlsZT0iZmlsbDojMDAwMDAwO2ZpbGwtb3BhY2l0eTowO3N0cm9rZTojYTQwMDAwO3N0cm9rZS13aWR0aDoyLjEzMTUzMDI4MDAwMDAwMDIyO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utb3BhY2l0eToxIgogICAgICAgICBkPSJtIDYxNC4zMDk5OCwzMzMuMDQzOSBjIDAsNS43NDUzMyAtNC4yNTY5LDE0LjY5MzA0IC0xOS4xODM3NSwxMS44MjAzOCBsIC0xMGUtNiwtOTcuNjcwODIgYyAxNC45MjY4NSwyLjg3MjY2IDE5LjE4Mzc0LC02LjA3NTA1IDE5LjE4Mzc0LC0xMS44MjAzOCB6IgogICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjY2NjIiAvPgogICAgICA8cGF0aAogICAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjY2NzYyIKICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgICAgaWQ9InBhdGg0MDI1IgogICAgICAgICBkPSJtIDU0NS45NjQ1OSwyNjkuNTMyNDUgMCw0Ni4yNTI2OCA0OC40MjY0NCwyOC43MzAzIDAsLTM4LjA0MzM1IGMgLTEwLjU2OTg2LC00LjM5NjcgLTIxLjgyNjA5LC05LjgwOTA0IC0yNS4wODIwMSwtMTYuNTY5OTkgLTMuODY2OTksLTguMDI5ODcgLTE0LjMwNjE0LC0xOC4yNzAzMiAtMjMuMzQ0NDMsLTIwLjM2OTY0IHoiCiAgICAgICAgIHN0eWxlPSJmaWxsOiNlZWVlZWM7ZmlsbC1vcGFjaXR5OjAuMTI3MzU4NDc7c3Ryb2tlOm5vbmUiIC8+CiAgICAgIDxwYXRoCiAgICAgICAgIHN0eWxlPSJmb250LXNpemU6bWVkaXVtO2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtdmFyaWFudDpub3JtYWw7Zm9udC13ZWlnaHQ6bm9ybWFsO2ZvbnQtc3RyZXRjaDpub3JtYWw7dGV4dC1pbmRlbnQ6MDt0ZXh0LWFsaWduOnN0YXJ0O3RleHQtZGVjb3JhdGlvbjpub25lO2xpbmUtaGVpZ2h0Om5vcm1hbDtsZXR0ZXItc3BhY2luZzpub3JtYWw7d29yZC1zcGFjaW5nOm5vcm1hbDt0ZXh0LXRyYW5zZm9ybTpub25lO2RpcmVjdGlvbjpsdHI7YmxvY2stcHJvZ3Jlc3Npb246dGI7d3JpdGluZy1tb2RlOmxyLXRiO3RleHQtYW5jaG9yOnN0YXJ0O2Jhc2VsaW5lLXNoaWZ0OmJhc2VsaW5lO2NvbG9yOiMwMDAwMDA7ZmlsbDpub25lO3N0cm9rZTojZWYyOTI5O3N0cm9rZS13aWR0aDoyLjEzMTUzMDI4MDAwMDAwMDIyO3N0cm9rZS1vcGFjaXR5OjE7bWFya2VyOm5vbmU7dmlzaWJpbGl0eTp2aXNpYmxlO2Rpc3BsYXk6aW5saW5lO292ZXJmbG93OnZpc2libGU7ZW5hYmxlLWJhY2tncm91bmQ6YWNjdW11bGF0ZTtmb250LWZhbWlseTpTYW5zOy1pbmtzY2FwZS1mb250LXNwZWNpZmljYXRpb246U2FucyIKICAgICAgICAgZD0ibSA1NDguMjA5LDIyMS45OTUxNCA0NC45NjU5NywyNi41MTE4NSAwLDkyLjc4MTI2IC00NC44NTUwMiwtMjYuNDQ0MzcgeiIKICAgICAgICAgaWQ9InBhdGg1MDc0IgogICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjY2NjIiAvPgogICAgICA8dXNlCiAgICAgICAgIHg9IjAiCiAgICAgICAgIHk9IjAiCiAgICAgICAgIHhsaW5rOmhyZWY9IiNwYXRoMzIxNyIKICAgICAgICAgaWQ9InVzZTQwMzgiCiAgICAgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03LjQwMDA1OTVlLTgsNjQuMzM4OTg0KSIKICAgICAgICAgd2lkdGg9IjMwMCIKICAgICAgICAgaGVpZ2h0PSIyMjUiCiAgICAgICAgIHN0eWxlPSJzdHJva2U6I2E0MDAwMDtzdHJva2Utd2lkdGg6MS4zMTQ1NzIwOTk5OTk5OTk5MSIgLz4KICAgICAgPHBhdGgKICAgICAgICAgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6I2YyNTA1MDtzdHJva2Utd2lkdGg6Mi4xMzE1MzAyODAwMDAwMDAyMjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2Utb3BhY2l0eToxO3N0cm9rZS1kYXNoYXJyYXk6bm9uZSIKICAgICAgICAgZD0ibSA1OTMuMDI4OTUsMjQ2LjAxMjU2IDAsOTcuMDQ0MzIiCiAgICAgICAgIGlkPSJwYXRoNTA5NCIKICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgICAgc29kaXBvZGk6bm9kZXR5cGVzPSJjYyIgLz4KICAgICAgPHBhdGgKICAgICAgICAgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2U6I2E0MDAwMDtzdHJva2Utd2lkdGg6Mi4xMzE1MzAyODAwMDAwMDAyMjtzdHJva2UtbGluZWpvaW46cm91bmQiCiAgICAgICAgIGQ9Im0gNTQ2LjEwMTAyLDMxNS45OTE2NSA0Ni41OTk1MSwyNy40NDQwNiBjIDEuOTc4MjMsLTAuMzc2OCAyLjQyNTY5LDEuNDI4NTcgMi40MjU2OSwxLjQyODU3IGwgMCwtOTcuNjcwODIgYyAwLDAgLTAuMDIyNiwtMi4wODYxOSAtMi41MTk1MywtMS40ODM4NCBsIC00Ni41MDU2NywtMjcuMzg4NzkgeiIKICAgICAgICAgaWQ9InBhdGg0MDMwIgogICAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIgogICAgICAgICBzb2RpcG9kaTpub2RldHlwZXM9ImNjY2NjY2MiIC8+CiAgICAgIDxwYXRoCiAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgICAgIGlkPSJwYXRoNDAzMiIKICAgICAgICAgZD0ibSA1NTQuNjAyNjQsMjM1LjM3MzA4IDI5Ljg1MzY5LDE3LjIzNjAyIgogICAgICAgICBzdHlsZT0iZmlsbDojZWVlZWVjO2ZpbGwtb3BhY2l0eTowLjEyNzM1ODQ3MDAwMDAwMDAwO3N0cm9rZTojZWRkNDAwO3N0cm9rZS13aWR0aDoyLjU1NzgzNjM7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmUiIC8+CiAgICAgIDxwYXRoCiAgICAgICAgIHN0eWxlPSJmaWxsOiNlZWVlZWM7ZmlsbC1vcGFjaXR5OjAuMTI3MzU4NDcwMDAwMDAwMDA7c3Ryb2tlOiNlZGQ0MDA7c3Ryb2tlLXdpZHRoOjIuNTU3ODM2MztzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZSIKICAgICAgICAgZD0ibSA1NTQuNjAyNjUsMjQxLjExODQxIDI5Ljg1MzY5LDE3LjIzNjAyIgogICAgICAgICBpZD0icGF0aDQwMzQiCiAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiIC8+CiAgICAgIDxwYXRoCiAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgICAgIGlkPSJwYXRoNDAzNiIKICAgICAgICAgZD0ibSA1NTQuNjAyNjUsMjQ2Ljg2Mzc1IDI5Ljg1MzY5LDE3LjIzNjAzIgogICAgICAgICBzdHlsZT0iZmlsbDojZWVlZWVjO2ZpbGwtb3BhY2l0eTowLjEyNzM1ODQ3MDAwMDAwMDAwO3N0cm9rZTojZWRkNDAwO3N0cm9rZS13aWR0aDoyLjU1NzgzNjM7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLW9wYWNpdHk6MTtzdHJva2UtbWl0ZXJsaW1pdDo0O3N0cm9rZS1kYXNoYXJyYXk6bm9uZSIgLz4KICAgICAgPHBhdGgKICAgICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIKICAgICAgICAgaWQ9InBhdGg0MDQ0IgogICAgICAgICBkPSJtIDU2NC41NTM4NywyNTguMzU0NDMgOS45NTEyMyw1Ljc0NTM1IgogICAgICAgICBzdHlsZT0iZmlsbDpub25lO3N0cm9rZTojZWRkNDAwO3N0cm9rZS13aWR0aDoyLjU1NzgzNjM7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLW1pdGVybGltaXQ6NDtzdHJva2UtZGFzaGFycmF5Om5vbmUiIC8+CiAgICAgIDxwYXRoCiAgICAgICAgIHN0eWxlPSJmaWxsOiNjYzAwMDA7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiNlZGQ0MDA7c3Ryb2tlLXdpZHRoOjIuMTMxNTMwMjg7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLW9wYWNpdHk6MTtzdHJva2UtZGFzaGFycmF5Om5vbmUiCiAgICAgICAgIGQ9Im0gNjA3Ljk1MTg5LDI3OS4yMjUzMyAwLDIyLjI5NDU5IgogICAgICAgICBpZD0icGF0aDQ5NTYiCiAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiIC8+CiAgICAgIDxwYXRoCiAgICAgICAgIHN0eWxlPSJmaWxsOiNjYzAwMDA7ZmlsbC1vcGFjaXR5OjE7c3Ryb2tlOiNlZGQ0MDA7c3Ryb2tlLXdpZHRoOjIuMTMxNTMwMjg7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1taXRlcmxpbWl0OjQ7c3Ryb2tlLW9wYWNpdHk6MTtzdHJva2UtZGFzaGFycmF5Om5vbmUiCiAgICAgICAgIGQ9Im0gNjAzLjY4ODg0LDI4MS4zNTY4MyAtMi41ZS00LDIyLjgzNTA1IgogICAgICAgICBpZD0icGF0aDQ5NzAiCiAgICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiCiAgICAgICAgIHNvZGlwb2RpOm5vZGV0eXBlcz0iY2MiIC8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K';
  };

  render() {
    const { classes, selected, stats, book, connectDragSource, isDragging } = this.props;
    return (connectDragSource(

      <div key={book.id} id={book.id}>
        <Segment
          key={book.id}
          className={classnames([classes.book, { [classes.bookSel]: selected === book.id, [classes.draggingBook]: isDragging }])}
          onClick={this.props.onSelect(book.id)}
        >
          <span className={classnames([classes.bookName, { [classes.bookNameVisible]: selected === book.id }])} title={book.name}>
            <Icon name="book"/>
            {book.name}
          </span>
          {
            selected !== book.id &&
            <div className={classes.isbn}>{book.id}</div>
          }
          <div className={classnames([classes.bookDetails, { [classes.bookDetailsVisible]: selected === book.id }])}>
            <img className={classes.bookImage} src={book.image} alt="book"/>
            <div className={classnames([classes.bookInfo, { [classes.bookInfoVisible]: selected === book.id }])}>
              <div className={classes.row}>
                <span>Автор:&nbsp;</span>
                <span className={classes.bookData}>{book.author}</span>
              </div>
              <div className={classes.row}>
                <span>Рік:&nbsp;</span>
                <span className={classes.bookData}>{book.year}</span>
              </div>
              <div className={classes.row}>
                <span>ISBN:&nbsp;</span>
                <span className={classes.bookData}>{book.id}</span>
              </div>
              <div className={classes.row}>
                <span>Всього в бібліотеках:&nbsp;</span>
                <span className={classes.bookData}>{stats && stats.total}</span>
              </div>
              <div>
                <Popup
                  trigger={
                    <Icon
                      size="large" name="edit" className={`${classes.bigBookButton} edit`}
                      onClick={this.props.onEdit({ entity: 'published', id: book.id })}
                    />
                  }
                  content='Редагування книги'
                />
                <Popup
                  trigger={
                    <Icon
                      size="large" name="remove circle" className={`${classes.bigBookButton} remove`}
                      onClick={this.props.onRemoveFromLibraries({ id: book.id })}
                    />
                  }
                  content='Видалити з біблиотек'
                />
                <Popup
                  trigger={
                    <Icon
                      size="large" name="delete" className={`${classes.bigBookButton} delete`}
                      onClick={this.props.onDelete({ entity: 'published', id: book.id, name: book.name })}
                    />
                  }
                  content='Видалення книги'
                />
              </div>
            </div>
          </div>
          {
            selected !== book.id &&
            <Fragment>
              <Popup
                trigger={
                  <Icon
                    className={classes.editBookButton} size="small" name="edit"
                    onClick={this.props.onEdit({ entity: 'published', id: book.id })}
                  />
                }
                content='Редагування книги'
              />
              <Popup
                trigger={
                  <Icon
                    className={classes.removeBookButton} size="small" name="remove circle"
                    onClick={this.props.onRemoveFromLibraries({ id: book.id })}
                  />
                }
                content='Видалити з біблиотек'
              />
              <Popup
                trigger={
                  <Icon
                    className={classes.deleteBookButton} size="small" name="delete"
                    onClick={this.props.onDelete({ entity: 'published', id: book.id, name: book.name })}
                  />
                }
                content='Видалення книги'
              />
            </Fragment>
          }
          {
            stats && selected === book.id &&
            <Fragment>
              {
                Object.keys(stats.byLibraries).length > 0 &&
                <div key={-1} className={classes.presenceTitle}>Наявність в бібліотеках:</div>
              }
              {
                Object.keys(stats.byLibraries).map(key => {
                  const { id, count, name } = stats.byLibraries[key];
                  return (
                    <div key={id} className={classes.presence}>
                      <span className={classes.presenceNumber}>{count}</span>
                      <a className={classes.presenceLink} onClick={this.props.onSelectLibrary(id)}>{name}</a>
                    </div>
                  )
                })
              }
            </Fragment>
          }
        </Segment>
      </div>
    ))
  }
}

const bookSource = {
  beginDrag(props) {
    // Return the data describing the dragged item
    const item = { id: props.book.id };
    console.log('start drag with', props.book);
    return item;
  },

  // endDrag(props, monitor, component) {
  //   if (!monitor.didDrop()) {
  //     return;
  //   }
  //
  //   // When dropped on a compatible target, do something
  //   const item = monitor.getItem();
  //   const dropResult = monitor.getDropResult();
  //   CardActions.moveCardToList(item.id, dropResult.listId);
  // }
};

export default flow(
  DragSource(
    'BOOK',
    bookSource,
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      connectDragPreview: connect.dragPreview(),
      isDragging: monitor.isDragging(),
    })
  ),
  injectSheet(styles),
)(PublishedBook);
