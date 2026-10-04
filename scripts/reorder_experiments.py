import re

def reorder():
    with open('src/experimentsData.js', 'r', encoding='utf-8') as f:
        content = f.read()

    # Find prefix before INITIAL_EXPERIMENTS = [
    prefix_match = re.search(r'export const INITIAL_EXPERIMENTS = \[\r?\n', content)
    if not prefix_match:
        print("Could not find INITIAL_EXPERIMENTS declaration")
        return
    
    prefix = content[:prefix_match.end()]

    # Find the positions of each experiment
    # They each start with '  {\n    id: "exp-X"'
    exp_pattern = re.compile(r'  \{\s*\r?\n\s*id:\s*"(exp-\d+)"')
    starts = [(m.group(1), m.start()) for m in exp_pattern.finditer(content)]
    
    print("Found experiments:", [s[0] for s in starts])

    # Suffix starts where the array closes: '];'
    suffix_match = re.search(r'\r?\n\];\s*$', content)
    if not suffix_match:
        print("Could not find end of array ];")
        return
    
    suffix = suffix_match.group(0)

    # Slice each experiment
    exp_blocks = {}
    for i in range(len(starts)):
        exp_id, start_pos = starts[i]
        if i + 1 < len(starts):
            end_pos = starts[i+1][1]
        else:
            end_pos = suffix_match.start()
        
        # Strip trailing comma / newline from the block
        block = content[start_pos:end_pos].rstrip()
        if block.endswith(','):
            block = block[:-1].rstrip()
        exp_blocks[exp_id] = block

    print("Extracted blocks for:", list(exp_blocks.keys()))

    # Desired order: exp-4, exp-5, exp-6. exp-3 is excluded (removed)!
    ordered_ids = ['exp-4', 'exp-5', 'exp-6']
    
    new_experiments_content = ',\n'.join(exp_blocks[eid] for eid in ordered_ids)
    
    new_full_content = prefix + new_experiments_content + '\n' + suffix.lstrip()

    with open('src/experimentsData.js', 'w', encoding='utf-8') as f:
        f.write(new_full_content)

    print("Successfully reordered experiments to [exp-4, exp-5, exp-6] and removed exp-3!")

if __name__ == '__main__':
    reorder()
