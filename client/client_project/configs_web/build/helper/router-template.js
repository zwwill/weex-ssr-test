import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

<%
function recursiveRoutes(routes, tab, components) {
    let res = ''
    routes.forEach((route, i) => {
        route._name = '_' + hash(route.component)
        components.push({ _name: route._name, component: route.component, name: route.name, chunkName: route.chunkName })
        res += tab + '{\n'
        res += tab + '\tpath: ' + JSON.stringify(route.path) + ',\n'
        res += tab + '\tcomponent: ' + route._name
        res += (route.name) ? ',\n\t' + tab + 'name: ' + JSON.stringify(route.name) : ''
        res += (route.children) ? ',\n\t' + tab + 'children: [\n' + recursiveRoutes(routes[i].children, tab + '\t\t', components) + '\n\t' + tab + ']' : ''
        res += '\n' + tab + '}' + (i + 1 === routes.length ? '' : ',\n')
    })
    return res
}

const _components = []
const _routes = recursiveRoutes(router.routes, '\t\t', _components)
uniqBy(_components, '_name').forEach((route) => { %>const <%= route._name %> = () => import('<%= relativeToBuild(route.component) %>' /* webpackChunkName: "<%= getChunkName(route) %>" */).then(m => m.default || m)
    <% }) %>


<% if (router.scrollBehavior) { %>
    const scrollBehavior = <%= serialize(router.scrollBehavior).replace('scrollBehavior(', 'function(').replace('function function', 'function') %>
    <% } else { %>
    const scrollBehavior = function () {}
<% } %>


export function createRouter () {
    return new Router({
        mode: '<%= router.mode %>',
        base: '<%= router.base %>',
        linkActiveClass: '<%= router.linkActiveClass %>',
        linkExactActiveClass: '<%= router.linkExactActiveClass %>',
        scrollBehavior,
        routes: [
            <%= _routes %>
        ],
        <% if (router.parseQuery) { %>parseQuery: <%= serialize(router.parseQuery).replace('parseQuery(', 'function(') %>,<% } %>
        <% if (router.stringifyQuery) { %>stringifyQuery: <%= serialize(router.stringifyQuery).replace('stringifyQuery(', 'function(') %>,<% } %>
            fallback: <%= router.fallback || false%>
    })
}


