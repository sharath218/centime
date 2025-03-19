
import { configureStore } from '@reduxjs/toolkit';
import flowReducer, { 
  addNode, 
  addLink, 
  deleteLink, 
  updateLinkSourceTarget 
} from '../../store/flowSlice';

describe('flowSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        flow: flowReducer
      }
    });
  });

  test('should have initial state', () => {
    const state = store.getState().flow;
    expect(state.nodes).toEqual([]);
    expect(state.links).toEqual([]);
  });

  test('should add a node', () => {
    const node = { id: 'node_123', name: 'Test Node' };
    store.dispatch(addNode(node));
    
    const state = store.getState().flow;
    expect(state.nodes).toHaveLength(1);
    expect(state.nodes[0]).toEqual(node);
  });

  test('should add multiple nodes', () => {
    const node1 = { id: 'node_1', name: 'Node 1' };
    const node2 = { id: 'node_2', name: 'Node 2' };
    
    store.dispatch(addNode(node1));
    store.dispatch(addNode(node2));
    
    const state = store.getState().flow;
    expect(state.nodes).toHaveLength(2);
    expect(state.nodes[0]).toEqual(node1);
    expect(state.nodes[1]).toEqual(node2);
  });

  test('should add a link', () => {
    // First add two nodes
    store.dispatch(addNode({ id: 'node_1', name: 'Node 1' }));
    store.dispatch(addNode({ id: 'node_2', name: 'Node 2' }));
    
    // Then add a link between them
    const link = { source: 'node_1', target: 'node_2', value: 10 };
    store.dispatch(addLink(link));
    
    const state = store.getState().flow;
    expect(state.links).toHaveLength(1);
    expect(state.links[0]).toEqual(link);
  });

  test('should delete a link', () => {
    // Setup: add nodes and a link
    store.dispatch(addNode({ id: 'node_1', name: 'Node 1' }));
    store.dispatch(addNode({ id: 'node_2', name: 'Node 2' }));
    store.dispatch(addLink({ source: 'node_1', target: 'node_2', value: 10 }));
    
    // Delete the link
    store.dispatch(deleteLink({ source: 'node_1', target: 'node_2' }));
    
    const state = store.getState().flow;
    expect(state.links).toHaveLength(0);
  });

  test('should update link source, target and value', () => {
    // Setup: add nodes and a link
    store.dispatch(addNode({ id: 'node_1', name: 'Node 1' }));
    store.dispatch(addNode({ id: 'node_2', name: 'Node 2' }));
    store.dispatch(addNode({ id: 'node_3', name: 'Node 3' }));
    store.dispatch(addLink({ source: 'node_1', target: 'node_2', value: 10 }));
    
    // Update the link
    store.dispatch(updateLinkSourceTarget({ 
      index: 0, 
      source: 'node_1', 
      target: 'node_3', 
      value: 20 
    }));
    
    const state = store.getState().flow;
    expect(state.links[0].source).toBe('node_1');
    expect(state.links[0].target).toBe('node_3');
    expect(state.links[0].value).toBe(20);
  });
});